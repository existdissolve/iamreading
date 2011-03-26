IAR.ui.GoalList = Ext.extend(Ext.Panel,{
	fullscreen: true,
	layout: "card",
	id: "goallistpanel",
	initComponent: function() {
		this.goallistnav = new Ext.Toolbar({
			dock: 	"top",
			title:	"Goals",
			items:	[
				{
					text: 	"Edit",
					id: 	"goaleditbutton",
					hidden: Ext.StoreMgr.getByKey("goalstore").getCount()==0 ? true : false,
					handler: function() {
						if(this.text=="Edit") {
							this.setText("Save");
							// lock list so items can't be selected while editing
							Ext.getCmp("goallist").selModel.setLocked(true);
							Ext.each(Ext.get(Ext.DomQuery.select('#goallist .slider')).elements,function(rec,i){
								var chkbox = rec.previousSibling;
								Ext.get(rec).setStyle("-webkit-transform","translate(30px,0px)");
								Ext.get(chkbox).setStyle("opacity","1");
								chkbox.style.display = 'inline';
							}); 
						}
						else if(this.text=="Save") {
							this.setText("Edit");	
							var deletelist = [];
							// unlock list now that editing is done
							Ext.getCmp("goallist").selModel.setLocked(false);
							Ext.each(Ext.get(Ext.DomQuery.select('#goallist .slider')).elements,function(rec,i){
								var chkbox = rec.previousSibling;
								Ext.get(chkbox).setStyle("opacity","0");
								Ext.get(rec).setStyle("-webkit-transform","translate(0px,0px)");
							}); 
							Ext.each(Ext.get(Ext.DomQuery.select('#goallist .checkbox')).elements,function(rec,i){
								if(Ext.get(rec).dom.checked) {
									var li = Ext.getCmp("goallist").getNode(i);
									deletelist.push(rec.value);
								}
							});
							// if there are awards to delete, fire deleteawards()
							if(deletelist.length) {
								Ext.getCmp("goalpanel").deletegoals(deletelist);
							}
						}
					}
				},
				{xtype: 'spacer'},
				{
					iconCls: 	"add_black",
					iconMask: 	true,
					ui: 		'plain',
					id:			"goaladdbutton",
					handler: function(){
						var goal = Ext.ModelMgr.create({
							title: "",
							description: "",
							threshold: "",
							type: "",
							completetext: "",
							oldtitle: "",
							imagesearchvalue: ""
						}, 'Goal');
						Ext.getCmp("goalform").load(goal);
						Ext.getCmp("goalpanel").setActiveItem(2,"flip");
					}
				}
			]
		});
		this.dockedItems = [this.goallistnav];
		this.items = [
			{
				xtype: 	"list",
				id:		"goallist",
				store: 	goalstore,
				onItemDisclosure: true,
				preventSelectionOnDisclose: true,
				emptyText: "<p class='emptytext'>There are no goals set...you should add some, since that's the point :)</p>",
				deferEmptyText: false,
				itemTpl:	'<input type="checkbox" class="checkbox" value="{id}" /><div class="slider"><div class="smthumb"><img src="{imageurl}" />' +
								'</div><div class="booktitle">{title}<tpl if="hasseen==\'false\'"><img src="images/new.png" class="newicon" /></tpl></div></div>',
				listeners:  {
					"selectionchange": function(selmodel,records){
						if(records.length) {
							Ext.getCmp("goaldetail").update(records[0].data);
							Ext.getCmp("goalpanel").markgoalseen(records[0]);
							Ext.getCmp("goalpanel").setActiveItem(1,"flip");
						}
					},
					"disclose": function(record,node,index,e) {
						var goal = Ext.ModelMgr.create({
							title: record.data.title,
							description: record.data.description,
							threshold: record.data.threshold,
							type: record.data.type,
							imagesearch: "",
							imagesearchvalue: record.data.imageurl,
							completetext: record.data.completetext,
							category_id: record.data.category_id,
							oldtitle: record.data.title,
							id: record.data.id
						}, 'Goal');
						Ext.getCmp("goalform").load(goal);
						// load blank data into search list in order to clear previous searches
						ClearImageSearch();
						Ext.getCmp("goalpanel").setActiveItem(2,"flip");
					}
				}
			}
		];
		this.listeners = {
			"activate": function() {
				Ext.getCmp("goallist").selModel.deselectAll();	
			}
		};
		IAR.ui.GoalList.superclass.initComponent.call(this);
		this.doComponentLayout();
	}
});