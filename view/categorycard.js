IAR.ui.CategoryCard = Ext.extend(Ext.Panel,{
	iconCls: 	"bookmarks",
	title:		"Categories",
	id:			"categorypanel",
	layout:		{type:"card"},
	fullscreen: true,
	cardSwitchAnimation: "slide",
	initComponent:	function() {	
		this.items = [
			new IAR.ui.CategoryList(),
			new IAR.ui.CategoryForm()
		];
		IAR.ui.CategoryCard.superclass.initComponent.call(this);
	},
	addcategory: function(f) {
		var category 	= f.items[0].getValue();
		var oldcategory	= f.items[1].getValue();
		var id			= f.items[2].getValue();
		var categories = Ext.StoreMgr.getByKey("categorystore");
		var newcategory = categories.add({
			category: category								 
		});
		categories.sync();
		Ext.getCmp("categorypanel").setActiveItem(0,"flip");
	},
	savecategory: function(f) {
		var category 	= f.items[0].getValue();
		var oldcategory	= f.items[1].getValue();
		var id			= f.items[2].getValue();
		
		var categories = Ext.StoreMgr.getByKey("categorystore");
		var record = categories.getAt(categories.find("id",id));
		record.set("category",category);
		categories.sync();
		Ext.getCmp("categorypanel").setActiveItem(0,"flip");
	}
});