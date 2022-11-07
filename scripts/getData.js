$.ajax({
    url : 'php/getUser.php', // your php file
    type : 'GET', // type of the HTTP request
    success : function(data){
        var obj = data.split('\\');
        var userName = obj[1];
        processUser(userName);
        $.ajax({
            url : 'php/getAdminUsers.php', // your php file
            type : 'GET', // type of the HTTP request
            cache: false,
            success : function(data){
                var obj = jQuery.parseJSON(data);
                processAdmUsers(obj);
                $.ajax({
                    url : 'php/getUsersData.php', // your php file
                    type : 'GET', // type of the HTTP request
                    cache: false,
                    success : function(data){
                        var obj = jQuery.parseJSON(data);
                        processUsers(obj);
                        $.ajax({
                            url : 'php/getDTUsers.php', // your php file
                            type : 'GET', // type of the HTTP request
                            cache: false,
                            success : function(data){
                                var obj = jQuery.parseJSON(data);
                                processDTUsers(obj);
                                $.ajax({
                                    url : 'php/getActiveDir.php', // your php file
                                    type : 'GET', // type of the HTTP request
                                    cache: false,
                                    success : function(data){
                                        var obj = jQuery.parseJSON(data);
                                        getActiveDir(obj);
                                        $.ajax({
                                            url : 'php/getDataTables.php', // your php file
                                            type : 'GET', // type of the HTTP request
                                            cache: false,
                                            success : function(data){
                                                var obj = jQuery.parseJSON(data);
                                                getTables(obj);
                                                $.ajax({
                                                    url : 'php/getDataFields.php', // your php file
                                                    type : 'GET', // type of the HTTP request
                                                    cache: false,
                                                    success : function(data){
                                                        var obj = jQuery.parseJSON(data);
                                                        getFields(obj);
                                                        $.ajax({
                                                            url : 'php/getData.php', // your php file
                                                            type : 'GET', // type of the HTTP request
                                                            cache: false,
                                                            success : function(data){
                                                                var obj = jQuery.parseJSON(data);
                                                                setupTable(obj);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});