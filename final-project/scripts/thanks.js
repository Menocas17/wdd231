export const thanksContent = () => {
    const currentUrl = window.location.href;
    const splitUrl = currentUrl.split('?');

    let formData = splitUrl[1].split('&');


    function show(data) {
        let result;
        formData.forEach((element) => {
            if (element.startsWith(data)) {
                result = decodeURIComponent(element.split('=')[1]).replace(/\+/g, ' '); 
            }
        });

        return result;
    }

    document.querySelector('#user-name').textContent = `${show('name')}`;
    document.querySelector('#user-email').textContent = `${show('email')}`;
};