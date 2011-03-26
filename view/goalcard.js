IAR.ui.GoalCard = Ext.extend(Ext.Panel,{
	iconCls: 	"flag",
	title:		"Goals",
	id:			"goalpanel",
	layout:		{type:"card"},
	fullscreen: true,
	initComponent: function() {
		this.items = [
			new IAR.ui.GoalList(),
			new IAR.ui.GoalDetail(),
			new IAR.ui.GoalForm(),
			new IAR.ui.GoalSearchList()
		];
		IAR.ui.GoalCard.superclass.initComponent.call(this);
		this.doComponentLayout(); 
	},
	deletegoals: function(list) {
		var obj = this;
		var goals = Ext.StoreMgr.getByKey("goalstore");
		var win = new Ext.MessageBox();
		if(list.length) {
			win.confirm('Hold Up!',"If you delete the selected goals, you might be deleting some awards as well? Is that okay with you?", function(btn){
				if(btn=='yes') {
					for(var i=0;i<list.length;i++) {
						var record = goals.findRecord("id",list[i]);
						goals.remove(record);
						obj.deleteaward(record);
					}
					goals.sync();
					if(goals.getCount()==0) {
						Ext.getCmp("goaleditbutton").hide();	
					}
				}
			});
		}
	},
	addgoal: function(f) {
		var title = 		f.items[0].getValue();
		var description =	f.items[1].getValue();
		var threshold =		f.items[2].getValue();
		var type =			f.items[3].getValue();
		var category =		f.items[4].getValue();
		var imageurl =		f.items[5].items.items[0].getValue();
		var completetext =	f.items[6].getValue();
		var oldtitle =		f.items[7].getValue();
		
		var goals = Ext.StoreMgr.getByKey("goalstore");
		var newgoal = goals.add({
			title:		title,
			description:description,
			threshold:	threshold,
			type:		type,
			category_id:category,
			imageurl:	imageurl,
			completetext:completetext,
			hasseen:	"false",
			complete:	"false"
		});
		goals.sync();
		this.checkgoals();
		Ext.getCmp("goaleditbutton").show();
		Ext.getCmp("goalpanel").setActiveItem(0,"flip");
	},
	savegoal: function(f) {
		// get values from form fields
		var title = 		f.items[0].getValue();
		var description =	f.items[1].getValue();
		var threshold =		f.items[2].getValue();
		var type =			f.items[3].getValue();
		var category =		f.items[4].getValue();
		var imageurl =		f.items[5].items.items[0].getValue();
		var completetext =	f.items[6].getValue();
		var oldtitle =		f.items[7].getValue();
		var id	=			f.items[8].getValue();
		// gre references to various stores and views
		var goals 	= Ext.StoreMgr.getByKey("goalstore");
		var awards	= Ext.StoreMgr.getByKey("awardstore");
		var goallist= Ext.getCmp("goallist");
		var awardlist= Ext.getCmp("awardlist");
		// get the goal based on the passed id
		var goal 	= goals.getAt(goals.find("id",id));
		// get any award linked to goal
		var award 	= awards.getAt(awards.find("goalid",id));
		if(typeof goal !=undefined) {
			// update record fields
			goal.set("title",title);
			goal.set("description",description);
			goal.set("threshold",threshold);
			goal.set("type",type);
			goal.set("category_id",category);
			goal.set("imageurl",imageurl);
			goal.set("completetext",completetext);
		}
		if(typeof award != "undefined") {
			// update record fields
			award.set("title",title);
			award.set("threshold",threshold);
			award.set("type",type);
			award.set("category_id",category);
			award.set("imageurl",imageurl);
			award.set("completetext",completetext);
		}
		// sync records
		goals.sync();
		awards.sync()
		// update views			
		goallist.refresh();
		awardlist.refresh();	
		// finally, run goal completion check
		this.checkgoals();
		Ext.getCmp("goalpanel").setActiveItem(0,"flip");
	},	
	checkgoals: function() {
		// this method is going to be a bit complex; we have to check not only for uncategorized goals, but more difficult-ly for goals
		// based on individual book completing by category
		
		// flags for whether any awards are added or removed
		var addedaward 	= false;
		var removedaward= false;
		var newawards 	= [];
		
		// get all the stores we'll need
		var books 	= Ext.StoreMgr.getByKey("booksstore");
		var goals 	= Ext.StoreMgr.getByKey("goalstore");
		var awards  = Ext.StoreMgr.getByKey("awardstore");
		// get all goals
		var allgoals = goals.getRange();
		// loop over categories
		for(var i=0;i<allgoals.length;i++) {
			var data = allgoals[i].data;
			var type 	= data.type;
			var num  	= data.threshold;
			var cat	 	= data.category_id;
			var goalid	= data.id;
			var title   = data.title;
			// filter books record set based on current category id
			books.filter("category_id",cat)
			// get filtered records
			var records = books.getRange();
			// count them :)
			var totalbooks = books.getCount();
			var totalpages = 0;
			// loop over each book in the filtered set and add pages together
			for(var x=0;x<records.length;x++) {
				totalpages = totalpages + records[x].data.pageCount;
			}
			// now that we have the total pages and books, we can check them against goals and awards
			
			// check if page-based goal has been met
			if(type=="pages" && num<=totalpages) {
				// check if goal is already been awarded
				if(awards.find("goalid",goalid) == -1) {
					this.completegoal(goals.getById(goalid),false);
					newawards.push(title);
					addedaward = true;
				}
			}
			// check if book-based goal has been met
			if(type=="books" && num<=totalbooks) {
				// check if goal is already been awarded
				if(awards.find("goalid",goalid) == -1) {
					this.completegoal(goals.getById(goalid),false);
					newawards.push(title);
					addedaward = true;
				}
			}
			// check if page-based goal has been undone
			if(type=="pages" && num>totalpages) {
				// check if goal is already been awarded
				if(awards.find("goalid",goalid) != -1) {
					this.deleteaward(goals.getById(goalid));
					removedaward = true;
				}
			}
			// check if book-based goal has been undone
			if(type=="books" && num>totalbooks) {
				// check if goal is already been awarded
				if(awards.find("goalid",goalid) != -1) {
					this.deleteaward(goals.getById(goalid));
					removedaward = true;
				}
			}
			//finally, clear the books filter for the next loop iteration
			books.clearFilter();
			books.sort();
		}
		// now that that nonsense is finished, alert user if awards have been added or removed
		if(addedaward) {
			var win = new Ext.MessageBox();
			var msg = "Nicely done! You just completed the following goals:<br /><br /><ul>";
			for(var y=0;y<newawards.length;y++) {
				msg += "<li>'"+newawards[y]+"'</li>";	
			}
			msg += "</ul>";
			
			win.alert('Sweet',msg,Ext.emptyFn);
		}
		if(removedaward) {
			var win = new Ext.MessageBox();
			win.alert('Uh-ohs',"Hmm, you just lost an award. No worries, though...just keep reading, and you'll be back in the limelight in no time!", Ext.emptyFn);
		}
	},
	completegoal: function(goal,showmsg) {
		var awards= Ext.StoreMgr.getByKey("awardstore");
		var goaldata = goal.data;
		awards.add({
			goalid:		goaldata.id,
			title:		goaldata.title,
			imageurl:	goaldata.imageurl,
			completetext:goaldata.completetext,
			category_id:goaldata.category_id,
			type:		goaldata.type,
			threshold:	goaldata.threshold
		});
		awards.sync();	
		if(showmsg) {
			var win = new Ext.MessageBox();
			win.alert('Woot!',"Congrats! You just completed '" + goaldata.title + "'. You kind of rock!", Ext.emptyFn);
		}
	},
	deleteaward: function(goal) {
		var awards= Ext.StoreMgr.getByKey("awardstore");
		var goaldata = goal.data;
		var record = awards.findRecord("goalid",goaldata.id);
		awards.remove(record);
		awards.sync();
	},
	markgoalseen: function(goal) {
		var goaldata = goal.data;
		if(goaldata.hasseen=="false") {
			var goals = Ext.StoreMgr.getByKey("goalstore");
			var goallist = Ext.getCmp("goallist");
			goal.set("hasseen",true);
			goals.sync();
			goallist.refresh();
			// reset badge text
			Ext.getCmp("masterpanel").setBadge();
		}
		else {
			return false;	
		}
	}
});