IAR.ui.SettingsList = Ext.extend(Ext.Panel,{
	fullscreen: true,	
	layout: "card",
	initComponent: function() {
		this.settingsnav = new Ext.Toolbar({
			dock: 	"top",
			title:	"Settings"				   
		});
		this.dockedItems = [this.settingsnav]; 
		this.items = [
			{
				xtype:	"list",
				id: 		"settingslist",
				store: new Ext.data.JsonStore({
					model: "Nav",
					data: [
						{title:"Preferences"},
						{title:"Reset"},
						{title:"Manage Categories"},
						{title:"Import Old Data"}
					]
				}),
				itemTpl: "{title}",
				listeners: {
					"itemtap": function(dv,index,item,e) {
						var title = dv.store.getAt(index).data.title;
						if(title=="Reset") {
							Ext.getCmp("settingspanel").resetapp();
						}
						if(title=="Preferences") {
							Ext.getCmp("settingspanel").setActiveItem(1,"flip");
						}
						if(title=="Manage Categories") {
							Ext.getCmp("settingspanel").setActiveItem(2,"flip");	
						}
						if(title=="Import Old Data") {
							Import();	
						}
					}
				}	
			}
		];
		this.listeners = {
			"activate": function() {
				Ext.getCmp("settingslist").selModel.deselectAll();	
			}	
		}
		IAR.ui.SettingsList.superclass.initComponent.call(this);
	}
});