const searchInput = document.querySelector("#search-input");

searchInput.addEventListener('keydown', function(event) {
    if(event.code === 'Enter'){
        search();
    }
});

function search () {
    const input = searchInput.value;

    window.location.href = "https://www.google.com/search?q="+input+"&rlz=1C1VDKB_enIN951IN951&sxsrf=" +input+ "AOaemvLyGZCAyHekE5tSgYrZnQ2TV1uQdw%3A1631806537028&ei=SWRDYcmgAanA3LUPlq-U0Ac&oq=hello&gs_lcp=Cgdnd3Mtd2l6EAMyCgguELEDEEMQkwIyBwgAELEDEEMyCggAELEDEIMBEEMyBAgAEEMyBAgAEEMyBAguEEMyCgguEMcBENEDEEMyBAguEEMyBAgAEEMyBAguEEM6BwgjELADECc6BwgAEEcQsAM6BAgjECc6CwgAEIAEELEDEIMBOgUIABCABDoICAAQgAQQsQM6BwgjEOoCECc6BQgAEJECOhEILhCABBCxAxCDARDHARDRAzoICAAQsQMQgwE6EQguEIAEELEDEIMBEMcBEKMCOggILhCABBCxAzoKCC4QxwEQowIQQzoOCC4QgAQQsQMQxwEQowI6CwguEIAEELEDEIMBOgoILhCxAxCDARBDSgQIQRgAUL__A1jNmARg4dgEaANwAngEgAHIAogBvRWSAQYyLTEwLjGYAQCgAQGwAQrIAQnAAQE&sclient=gws-wiz&ved=0ahUKEwiJ6eyH6YPzAhUpILcAHZYXBXoQ4dUDCA4&uact=5"
}