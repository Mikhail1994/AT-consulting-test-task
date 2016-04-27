
var books = null;
var users = null;
var page = 5;


function loadBooks(sortParam, pageParam){

    if (sortParam == null){
        sortParam = "author";
        $("#author").css('backgroundColor', 'darkgreen');
        $("#name").css('backgroundColor', 'aqua');
    }

    if (pageParam == null){
        pageParam = 5;
    }

    $.ajax(
        {
            type: 'GET',
            dataType: 'json',
            url:'/books',
            data: 'sortParam='+ sortParam +'&pageParam='+ pageParam,
            success:
                function(result){
                    books = null;
                    books = result;
                    var button = "";
                    var str = "<table> " + "<tr>" +
                        "<th> ISN </th>" +
                        "<th><div id='author' onclick='sortAuthor()'>Автор </div> </th>" +
                        "<th><div id='name' onclick='sortName()'>Название </div> </th>" +
                        "<th> Кем взята </th>" +
                        "<th> Удалить </th>" +
                        "</tr>";

                    for (var i=0;i<result.length;++i){

                        if (result[i].owner == 'busy'){
                            button = "<button onclick='getBook()'>Взять книгу</button>";
                        } else {
                            button = "<button onclick='returnBook()'>Отдать книгу</button>"
                        }
                        str+="<tr>" +
                        "<td>" + result[i].isn + "</td>" +
                        "<td>" + result[i].author + "</td>" +
                        "<td>" + result[i].title + "</td>" +
                        "<td>" +  button + "</td>" +
                        "<td><button onclick='deleteBook(this)'>Удалить</button></td>" +
                        + "</tr>";
                    }
                    str+="</table>";
                    $('#booksTable').html(str);
                },
            error:
                function(result){
                    var s = result;

                    document.write(s.statusText);
                }
        }
    )
}

function getNextPage(){
    page+=5;
    loadBooks(null,page);
}



function sortAuthor(){
    $("#author").css('backgroundColor', 'darkgreen');
    $("#name").css('backgroundColor', 'aqua');
    loadBooks('author')
}

function sortName(){
    $("#name").css('backgroundColor', 'darkgreen');
    $("#author").css('backgroundColor', 'aqua');
    loadBooks('title')
}



function loadUsers(){
    $.ajax(
        {
            type: 'GET',
            dataType: 'json',
            url:'/users',
            success:
                function(result){
                    users = null;
                    users = result;
                    var str = "<table> " + "<tr>" +
                        "<th> name </th>" + "<th> surname </th>"  + "</tr>";

                    for (var i=0;i<result.length;++i){
                        str+="<tr id=i>" +
                        "<td>"+  result[i].name + "</td>" +
                        "<td>"+ result[i].surname + "</td>" +
                        "<td><button onclick='deleteUser(this)'>Удалить польтзователя</button></td>"    +
                        "</tr>";
                    }
                    str+="</table>";
                    $('#usersTable').html(str);
                },
            error:
                function(result){
                    var s = result;
                    document.write(s.statusText);
                }
        }
    )
}


function deleteUser(c){
    var context = c.parentNode;
    var con = context.parentNode;
    alert(con.rowIndex);
    var id = users[con.rowIndex-1].id;
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/deleteUser',
        data:'id=' + id,
        success:
            function(result){

            },
        error:
            function(){

            }
    })
}



function returnBook(){
    $.ajax({
        type: 'POST',
        dataType:'json',
        url:'/returnBook',
        success:
            function(result){
                alert('Успех')
            },
        error:
            function(result){
                alert('Неуспех')
            }
    });
}

function getBook(){

}

function deleteBook(con){
    var c = con.parentNode;
    var cc = c.parentNode;
    var id = books[cc.rowIndex-1].id;
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/deleteBook',
        data: 'id=' + id,
        success:
            function(result){
                alert('Книга удалена')
            },
        error:
            function(result){
                alert('Книга не удалена')
            }
    })
}

function addUser(login,password){
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/addUser',
        data: 'login='+ login+'&password='+ password,
        success:
            function(result){
                alert('Пользователь добавлен')
            },
        error:
            function(result){
                alert('Пользователь не добавлен')
            }
    })
}

function confirm(){
    var login = $("#login").val();
    var password = $("#password").val();
    addUser(login,password);
}


function addBook(isn, author, title){
    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/addBook',
        data: 'isn='+ isn+'&author='+ author + '&title' + title,
        success:
            function(result){
                alert('Пользователь добавлен')
            },
        error:
            function(result){
                alert('Пользователь не добавлен')
            }
    });
}

function confirmBook(){
    var isn = $("#isn").val();
    var author = $("#author").val();
    var title = $("#title").val();
    addBook(isn, author, title)
}/**
 * Created by Mike on 27.04.2016.
 */
