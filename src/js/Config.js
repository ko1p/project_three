const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk';

const obj = {
    ownerId: '7bcf191d017bebaa8b251437',
    baseUrl: `${serverUrl}/cohort9`,
    authorization: '9dce8f97-40b1-4f6c-997f-d3c74ad92bf6',
    contentType: 'application/json'
};

export const Config = JSON.stringify(obj);