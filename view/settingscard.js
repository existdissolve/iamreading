IAR.ui.SettingsCard = Ext.extend(Ext.Panel,{
	title: 		"Settings",
	iconCls:	"settings",
	layout: 	"card",
	id:			"settingspanel",
	fullscreen: true,			 
	initComponent: function() {
		this.items = [
			new IAR.ui.SettingsList(),
			new IAR.ui.SettingsForm(),
			new IAR.ui.CategoryCard()
		];	
		IAR.ui.SettingsCard.superclass.initComponent.call(this);
	},
	sociallogin: function(action) {
		if(action=="login") {
			window.open("https://www.facebook.com/dialog/oauth?client_id="+fbpin+"&redirect_uri="+redir+"&scope=publish_stream&response_type=token", "_self");	
			Ext.getCmp("fblogin").setText("Logout");
			isfbloggedin = true;
		}
		if(action=="logout") {
			FB.logout(function(response) {
  				Ext.getCmp("fblogin").setText("Login");
				isfbloggedin = false;
			});	
		}
	},
	deletecategories: function(list) {
		var obj = this;
		var goals = 	Ext.StoreMgr.getByKey("goalstore");
		var awards= 	Ext.StoreMgr.getByKey("awardstore");
		var books = 	Ext.StoreMgr.getByKey("booksstore");
		var categories =Ext.StoreMgr.getByKey("categorystore");
		var win = new Ext.MessageBox();
		if(list.length) {
			win.confirm('Hold Up!',"If you delete these categories, any goals, awards and books will be put into the default category. Are you sure you want to do that?", function(btn){
				if(btn=='yes') {
					for(var i=0;i<list.length;i++) {
						// default books
						var record = books.findRecord("category_id",list[i]);
						if(record) {
							record.set("category_id",1);
							books.sync();
						}
						// default awards
						var record = awards.findRecord("category_id",list[i]);
						if(record) {
							record.set("category_id",1);
							awards.sync();
						}
						// default goals
						var record = goals.findRecord("category_id",list[i]);
						if(record) {
							record.set("category_id",1);
							goals.sync();
						}
						// delete category
						var record = categories.findRecord("id",list[i]);
						categories.remove(record);
					}
					categories.sync();
					// recheck goals/awards/books
					Ext.getCmp("goalpanel").checkgoals();
				}
			});
		}
	},
	resetapp: function() {
		Ext.Msg.prompt("Gut check","To start over, enter a 10 digit-number (no spaces)",function(btn,text) {
			if(btn=='ok' && text.length==10) {
				localStorage.clear();
				Ext.StoreMgr.getByKey("booksstore").load();
				Ext.StoreMgr.getByKey("goalstore").load();
				Ext.StoreMgr.getByKey("awardstore").load();
				Ext.StoreMgr.getByKey("categorystore").load();
				Ext.getCmp("bookslist").refresh();
				Ext.getCmp("goallist").refresh();
				Ext.getCmp("awardlist").refresh();
				Ext.getCmp("categorylist").refresh();
				Ext.getCmp("masterpanel").setBadge();
			}
		});		
	}
});