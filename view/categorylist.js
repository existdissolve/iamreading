IAR.ui.CategoryList = Ext.extend(Ext.Panel,{
	fullscreen: true,	
	layout: "card",
	initComponent: function() {
		this.categorynav = new Ext.Toolbar({
			dock: 	"top",
			title:	"Manage",
			items: 	[
				{
					text: 	"Back",
					id: 	"categorybackbutton",
					handler: function() {
						Ext.getCmp("settingspanel").setActiveItem(0,"flip");	
					}
				},
				{
					text: 	"Edit",
					id: 	"categoryeditbutton",
					handler: function() {
						if(this.text=="Edit") {
							this.setText("Save");
							// lock list so items can't be selected while editing
							Ext.getCmp("categorylist").selModel.setLocked(true);
							Ext.each(Ext.get(Ext.DomQuery.select('#categorylist .slider')).elements,function(rec,i){
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
							Ext.getCmp("categorylist").selModel.setLocked(false);
							Ext.each(Ext.get(Ext.DomQuery.select('#categorylist .slider')).elements,function(rec,i){
								var chkbox = rec.previousSibling;
								Ext.get(chkbox).setStyle("opacity","0");
								Ext.get(rec).setStyle("-webkit-transform","translate(0px,0px)");
							}); 
							Ext.each(Ext.get(Ext.DomQuery.select('#categorylist .checkbox')).elements,function(rec,i){
								if(Ext.get(rec).dom.checked) {
									var li = Ext.getCmp("categorylist").getNode(i);
									deletelist.push(rec.value);
								}
							});
							// if there are awards to delete, fire deleteawards()
							if(deletelist.length) {
								Ext.getCmp("settingspanel").deletecategories(deletelist);
							}
						}
					}
				},
				{xtype: 'spacer'},
				{
					iconCls: 	"add_black",
					iconMask: 	true,
					ui: 		'plain',
					id:			"categoryaddbutton",
					handler: function(){
						var category = Ext.ModelMgr.create({
							category: "",
							oldcateogry: "",
							id: ""
						}, 'Category');
						Ext.getCmp("categoryform").load(category);
						Ext.getCmp("categorypanel").setActiveItem(1,"flip");
					}
				}
			]
		});
		this.dockedItems = [this.categorynav];
		this.items = [
			{
				xtype:	"list",
				id:		"categorylist",
				store: 	categorystore,
				itemTpl:	'<tpl if="id!=1"><input type="checkbox" class="checkbox" value="{id}" /></tpl>' +
							'<tpl if="id==1"><input type="checkbox" class="checkbox" value="{id}" disabled="true" style="visibility:hidden;" /></tpl>' +
							'<div class="slider"><div class="categorytitle">{category}</div></div>',
				onItemDisclosure: true,
				preventSelectionOnDisclose: true,
				emptyText: "<p class='emptytext'>You haven't created any categories yet. It's not necessary, but helps create more specific goals. Why not try it? :)</p>",
				deferEmptyText: false,
				listeners: {
					"disclose": function(record,node,index,e) {
						var category = Ext.ModelMgr.create({
							category: record.data.category,
							oldcategory: record.data.category,
							id:	record.data.id
						}, 'Category');
						Ext.getCmp("categoryform").load(category);
						Ext.getCmp("categorypanel").setActiveItem(1,"flip");
					}
				}	
			}
		];
		this.listeners = {
			"activate": function() {
				Ext.getCmp("categorylist").selModel.deselectAll();	
			}
		};
		IAR.ui.CategoryList.superclass.initComponent.call(this);
	}
});