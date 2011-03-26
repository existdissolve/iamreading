IAR.ui.HomeCard = Ext.extend(Ext.Panel,{
	title: 	"Home",
	id: 	"homepanel",
	iconCls:"home",
	fullscreen: true,
	layout: "card",
	layoutOnOrientationChange: true,
	initComponent: function() {
		this.dockedItems = [
			{
				xtype: "toolbar",
				dock: "top",
				title: typeof ls.customapptitle != "undefined" && ls.customapptitle != "" ? ls.customapptitle : "iamreading"
			}
		];
		this.items = [
			{
				xtype: "panel",
				cls: Ext.is.Phone ? "homepanelphonebg" : "homepaneltabletbg",
				items: [
					{
						xtype: "button",
						cls: "bookquad quad",
						text: "My Books",
						html: '<img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="bookmarks" />',
						handler: function() {Ext.getCmp("masterpanel").setActiveItem(1);}
					},
					{
						xtype: "button",
						cls: "awardquad quad",
						text: "My Awards",
						html: '<img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="favorite" />',
						handler: function() {Ext.getCmp("masterpanel").setActiveItem(2);}
					},			
					{
						xtype: "button",
						cls: "goalquad quad",
						text: "Goals",
						html: '<img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="flag" />',
						handler: function() {Ext.getCmp("masterpanel").setActiveItem(3);}
					},
					{
						xtype: "button",
						cls: "searchquad quad",
						text: "Search Books",
						html: '<img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="search" />',
						handler: function() {
							Ext.getCmp("masterpanel").setActiveItem(1);
							Ext.getCmp("bookspanel").setActiveItem(2,"flip");
						}
					}	
				]
			}
		];
		IAR.ui.HomeCard.superclass.initComponent.call(this);	
	}
});