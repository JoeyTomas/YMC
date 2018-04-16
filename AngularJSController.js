
(function () {
    angular.module(ymcGlobals.appName)
        .controller("equipmentController", EquipmentController)
    EquipmentController.$inject = ["equipmentService"]
    function EquipmentController(equipmentService) {
        var vm = this;
        vm.equipmentService = equipmentService;
        vm.swal = swal;
        vm.showform = true;

        vm.item = null;
        vm.items = []; //holds all equipment
        vm.type = []; //holds equipment types
        vm.status = []; //holds equipment status
        vm.itemToBeDeleted = [];
        vm.itemToBeAdded = [];
        vm.itemToBeUpdated = [];
        vm.response = []; //holds post or put response for _getEquipByIdSuccess()

        //Handlers
        vm.$onInit = _onInit;
        vm.addBtn = _addBtn;
        vm.cancelBtn = _cancelBtn;
        vm.editBtn = _editBtn;
        vm.submitBtn = _submitBtn;
        vm.deleteBtn = _deleteBtn;

        //Styling
        vm.buttonStyle = "primary";
        vm.buttonText = "Submit";

        //Adds or updates equipment
        function _submitBtn() {
            //when updating
            if (vm.item && vm.item.id) {
                console.log("update button clicked!")
                vm.equipmentService.updateEquip(vm.item, vm.item.id)
                    .then(_updateSuccess, _updateError)
            } else {
            //when adding
                console.log("submit button clicked");
                vm.equipmentService.submitEquip(vm.item)
                    .then(_submitSuccess, _submitError)
                vm.itemToBeAdded = vm.item;
            }
        }
        //Delete equipment
        function _deleteBtn(item) {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function () {
                swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                console.log("Delete Btn Clicked");
                vm.equipmentService.deleteEquip(item.id).then(_deleteSuccess, _deleteError)
                vm.itemToBeDeleted = item;
            })
        }
        //Edit equipment
        function _editBtn(item) {
            console.log("edit clicked");
            vm.showForm = false;
            console.log(item);
            vm.equipmentService.getType().then(_getTypeSuccess, _getTypeError)
            vm.equipmentService.getStatus().then(_getStatusSuccess, _getStatusSuccess)
            vm.item = item;
            vm.buttonStyle = "warning";
            vm.buttonText = "Update";
            vm.itemToBeUpdated = item;
        }
        //Hide form
        function _cancelBtn() {
            vm.item = null;
            vm.showForm = true;
            vm.createEditForm.$setUntouched();
            vm.createEditForm.$setPristine();
        }
        //Show form
        function _addBtn() {
            vm.createEditForm.$setPristine();
            vm.showForm = false;
            vm.item = null;
            vm.equipmentService.getType().then(_getTypeSuccess, _getTypeError)
            vm.equipmentService.getStatus().then(_getStatusSuccess, _getStatusSuccess)
            vm.buttonStyle = "primary";
            vm.buttonText = "Submit";
        }
        //runs on page load, populates table
        function _onInit() {
            console.log('!');
            vm.equipmentService.getEquip().then(_getEquipSuccess, _getEquipError)
        }
        function _getEquipSuccess(response) {
            console.log('GetAll Controller Success');
            vm.items = response.data.items;
            console.log(vm.items);
        }
        function _getEquipError(error) {
            console.log("GetAll Controller Error");
            console.log(error);
        }
        //populates type picker
        function _getTypeSuccess(response) {
            console.log(response.data.items);
            vm.type = response.data.items;
        }
        function _getTypeError(error) {
            console.log(error);
        }
        //populates status picker
        function _getStatusSuccess(response) {
            console.log(response.data.items);
            vm.status = response.data.items;
        }
        function _getStatusError(error) {
            console.log(error);
        }
        //pops post success message, resets form, and updates view
        function _submitSuccess(response) {
            console.log("submitEquip Controller success");
            console.log(response)
            vm.response = response.config.method;
            vm.equipmentService.getEquipById(response.data.item).then(_getEquipByIdSuccess, _getEquipByIdError)
            vm.showForm = true;
            vm.item = null;
            vm.createEditForm.$setUntouched();
            vm.createEditForm.$setPristine();

            $.growl({
                message: 'Equipment added successfully.',

            }, {
                    element: 'body',
                    type: 'success',
                    allow_dismiss: true,

                    offset: {
                        x: 20,
                        y: 85
                    },
                    spacing: 10,
                    z_index: 1031,
                    delay: 2000,

                    url_target: '_blank',
                    mouse_over: false,
                });
        }
        function _submitError(error) {
            console.log("submitEquip Controller error");
            console.log(error);
        }
        //updates table with new or modified item
        function _getEquipByIdSuccess(response) {
            console.log("get by id controller success");
            if (vm.response === "POST") {
                console.log("post shift");
                vm.items.unshift(response.data.item);
            } else {
                console.log("put shift");
                vm.items.unshift(response.data.item);//shifts updated item to the top of array
                var index = vm.items.indexOf(vm.itemToBeUpdated);
                vm.items.splice(index, 1); //removes old shell from index
            }
        }
        function _getEquipByIdError(response) {
            console.log("get by id controller error");
        }
        //pops update success message, resets form, and updates view
        function _updateSuccess(response) {
            console.log("updateEquip Controller success");
            console.log(response);
            vm.response = response.config.method;
            vm.equipmentService.getEquipById(vm.item.id)
                .then(_getEquipByIdSuccess, _getEquipByIdError)
            vm.item = null;
            vm.createEditForm.$setUntouched();
            vm.showForm = true;

            $.growl({
                message: 'Equipment updated successfully.',

            }, {
                    element: 'body',
                    type: 'success',
                    allow_dismiss: true,

                    offset: {
                        x: 20,
                        y: 85
                    },
                    spacing: 10,
                    z_index: 1031,
                    delay: 2000,

                    url_target: '_blank',
                    mouse_over: false,

                });

        }
        function _updateError(error) {
            console.log("updateEquip Controller error");
            console.log(error);
        }
        //removes deleted item from view
        function _deleteSuccess(response) {
            console.log("deleteEquip Controller success");
            console.log(response.status);
            var index = vm.items.indexOf(vm.itemToBeDeleted);
            vm.items.splice(index, 1);
        }
        function _deleteError(error) {
            console.log("deleteEquip Controller error");
        }
    };
})();
