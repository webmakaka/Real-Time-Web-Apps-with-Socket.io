var socket = io();

function scrollToBottom(){
    // Selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');
    // Heights
    const clienHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();
    
    if (clienHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () =>{
    const params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if (err){
            alert(err);
            window.location.href = '/';
        } 
        
        console.log('No error');
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
    console.log('Users list', users);
    const ol = jQuery('<ol></ol>');
    
    users.forEach(function (users) {
        ol.append(jQuery('<li></li>').text(users));
    });
    
    jQuery('#users').html(ol);
});

socket.on('newMessage', (message) =>{
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html); 
    scrollToBottom();   
});


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    
    const messageTextbox =  jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('')
    });
});


let locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Gelocation not supported by your browser.');
    }
    
    locationButton.attr('disabled', true).text('Sendig location .... ');
    
    navigator.geolocation.getCurrentPosition(function(position){
        
        locationButton.removeAttr('disabled').text('Send location');
        
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});
