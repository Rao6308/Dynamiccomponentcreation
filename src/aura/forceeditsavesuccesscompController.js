({
    start : function(component,event,helper) {
        var id = component.get("v.recordId");
        var action = component.get("c.loadChallenges");
        action.setParams({"tId":id});
        action.setCallback(this,function(response){
            var tasks = response.getReturnValue();
            component.set("v.challenges",tasks);
        });
        $A.enqueueAction(action);
    },
    
    showEditPanel : function(component,event,helper){
        var selectedItem = event.currentTarget;
        var recId = selectedItem.dataset.record;
        component.set("v.isOpen", true);        
        var compEvent = component.getEvent("handleedit");
        compEvent.setParams({
            "selectedId": recId
        }).fire();
    },
    handleedit: function(component,event,helper){
        /*createComponentController.js*/
        
        $A.createComponents([
            ["force:recordEdit",
             {
                 "aura:id": 'editrecord',
                 "recordId": event.getParam("selectedId")
             }],
            ["lightning:button",
             {
                 "aura:id" : 'savebutton',
                 "label": "Save record", 
                 "onclick": component.getReference("c.handlePress")
             }]
        ],
                            function(editcomp, status, errorMessage){
                                //Add the new button to the body array
                                if (status === "SUCCESS") {
                                    var editval = editcomp[0];
                                    var button = editcomp[1];
                                    var body = component.get("v.body");
                                    body.push(editval);
                                    body.push(button);
                                    component.set("v.body", body);
                                }
                                else if (status === "INCOMPLETE") {
                                }
                                    else if (status === "ERROR") {
                                        
                                    }
                            }
                           );
    },
    handlePress : function(component) {
        console.log('#######'+ component.find({ instancesOf : "force:recordEdit" })[0]);
        component.find({ instancesOf : "force:recordEdit" })[0].get("e.recordSave").fire();
        component.set("v.isOpen", false);
        window.location.reload();
        
        
    }
    
})