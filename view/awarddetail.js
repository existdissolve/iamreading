IAR.ui.AwardDetail = Ext.extend(Ext.Panel,{
	id: 	"awarddetail",
	fullscreen: true,
	scroll: "vertical",
	styleHtmlContent: true,
	initComponent: function() {
		this.awardnav = new Ext.Toolbar({
			dock: 	"top",
			title:	"Award Detail",
			items: 	[
				{
					text: 	"Back",
					id:		"awardbackbutton",
					handler:function() {
						Ext.getCmp("awardpanel").setActiveItem(0,"flip");
					}
				}
			]
		});
		this.dockedItems = [this.awardnav];
		this.tpl = '<div class="awarddetail"><img class="mainimage" src="{imageurl}" /><h1>{title}</h1><h2>Goal: {threshold} {type}</h2><p>{completetext}</p>'
		IAR.ui.AwardDetail.superclass.initComponent.call(this);
	}
});