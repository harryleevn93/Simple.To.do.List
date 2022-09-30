let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):
{
    todo:[],
    completed:[]
};

var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="500" height="500"><path d="M21 2C19.355469 2 18 3.355469 18 5L18 7L10.15625 7C10.097656 6.992188 10.042969 6.984375 9.984375 6.984375C9.9375 6.988281 9.886719 6.992188 9.839844 7L8 7C7.640625 6.996094 7.304688 7.183594 7.121094 7.496094C6.941406 7.808594 6.941406 8.191406 7.121094 8.503906C7.304688 8.816406 7.640625 9.003906 8 9L9 9L9 45C9 46.644531 10.355469 48 12 48L38 48C39.644531 48 41 46.644531 41 45L41 9L42 9C42.359375 9.003906 42.695313 8.816406 42.878906 8.503906C43.058594 8.191406 43.058594 7.808594 42.878906 7.496094C42.695313 7.183594 42.359375 6.996094 42 7L40.167969 7C40.058594 6.980469 39.949219 6.980469 39.84375 7L32 7L32 5C32 3.355469 30.644531 2 29 2 Z M 21 4L29 4C29.554688 4 30 4.445313 30 5L30 7L20 7L20 5C20 4.445313 20.445313 4 21 4 Z M 11 9L18.832031 9C18.941406 9.019531 19.050781 9.019531 19.15625 9L30.832031 9C30.941406 9.019531 31.050781 9.019531 31.15625 9L39 9L39 45C39 45.554688 38.554688 46 38 46L12 46C11.445313 46 11 45.554688 11 45 Z M 17.988281 19.988281C17.582031 19.992188 17.21875 20.238281 17.0625 20.613281C16.910156 20.992188 17 21.421875 17.292969 21.707031L23.585938 28L17.292969 34.292969C17.03125 34.542969 16.925781 34.917969 17.019531 35.265625C17.109375 35.617188 17.382813 35.890625 17.734375 35.980469C18.082031 36.074219 18.457031 35.96875 18.707031 35.707031L25 29.414063L31.292969 35.707031C31.542969 35.96875 31.917969 36.074219 32.265625 35.980469C32.617188 35.890625 32.890625 35.617188 32.980469 35.265625C33.074219 34.917969 32.96875 34.542969 32.707031 34.292969L26.414063 28L32.707031 21.707031C33.003906 21.417969 33.089844 20.980469 32.929688 20.601563C32.769531 20.21875 32.394531 19.976563 31.980469 19.988281C31.71875 19.996094 31.472656 20.105469 31.292969 20.292969L25 26.585938L18.707031 20.292969C18.519531 20.097656 18.261719 19.992188 17.988281 19.988281Z" fill="#5B5B5B" /></svg>';

var completeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="208" height="208"><path d="M22.566406 4.730469L20.773438 3.511719C20.277344 3.175781 19.597656 3.304688 19.265625 3.796875L10.476563 16.757813L6.4375 12.71875C6.015625 12.296875 5.328125 12.296875 4.90625 12.71875L3.371094 14.253906C2.949219 14.675781 2.949219 15.363281 3.371094 15.789063L9.582031 22C9.929688 22.347656 10.476563 22.613281 10.96875 22.613281C11.460938 22.613281 11.957031 22.304688 12.277344 21.839844L22.855469 6.234375C23.191406 5.742188 23.0625 5.066406 22.566406 4.730469Z" fill="#5B5B5B" /></svg>';

renderTodolist();

document.getElementById('add').addEventListener('click', function()
{
    var value = document.getElementById('item').value;
    if (value)
    {
        addItem(value);
    }        
});

document.getElementById('item').addEventListener('keydown',function (e)
{
   var value = this.value;
   if ((e.code === 'Enter' || e.code === 'NumpabEnter') && value) 
   {
        addItem(value);
   }
});

function addItem(value)
{
    addItemToDOM(value);
    document.getElementById('item').value = '';
    data.todo.push(value);
    dataObjectUpdate();
}

function completedItem()
{
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id ==='todo')
    {
        data.todo.splice(data.completed.indexOf(value), 1);
        data.completed.push(value);
    }
    else
    {
        data.todo.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdate();

    var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

function addItemToDOM(text, completed)
{
    var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    complete.addEventListener('click', completedItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}

function renderTodolist()
{
    if (!data.todo.length && !data.completed.length) return;
    
    for (var i = 0; i < data.todo.length; i++)
    {
        var value = data.todo[i];
        addItemToDOM(value);
    }

    for (var i = 0; i < data.completed.length; i++)
    {
        var value = data.completed[i];
        addItemToDOM(value);
    }
}

function dataObjectUpdate()
{
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem()
{
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id ==='todo')
    {
        data.todo.splice(data.todo.indexOf(value), 1);
    }
    else
    {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdate();

    parent.removeChild(item);
}