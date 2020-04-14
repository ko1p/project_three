const ValidationMessages = (function () {
    const obj = {};
    
    const validationValueMissing = 'Это обязательное поле';
    obj.validationValueMissing = validationValueMissing;
    const validationLenghtErr = 'Должно быть от 2 до 30 символов';
    obj.validationLenghtErr = validationLenghtErr;
    const validationNotUrl = 'Здесь должна быть ссылка';
    obj.validationNotUrl = validationNotUrl;

    return obj;
})();