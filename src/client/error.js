const settings = require(`${process.env.root}/config/settings`);
const shared_embeds = require(`${process.env.root}/config/embeds/shared`);
const errors = {
    400: ['**400** | `Bad Request`', 'Э-э-э...'],
    401: ['**401** | `Unauthorized`', 'Нода отключена от основного сервера.'],
    403: ['**403** | `Forbidden`', 'Неправильный API ключ был установлен.'],
    404: ['**404** | `Not Found`', 'Ага, моя любимая ошибка.\n\nПроизошло банально потому что :\n • Айдишник сервера настроен неправильно.\n • Кто-то сломал бота\n • Сам сервер переехал'],
    405: ['**405** | `Method Not Allowed`', 'Этого не должно было произойти. Отпиши r3t4rd#0157 или на форум - https://yufu.us/forums'],
    412: ['**412** | `Precondition Failed`', 'Сервер выключен. По крайней мере похоже на это.'],
    429: ['**429** | `Too Many Requests`', 'Притормози, друг.'],
    500: ['**500** | `Internal Server Error`', 'Ебать, основной сервер отвалился. Отпиши r3t4rd#0157 или на форум - https://yufu.us/forums'],
    503: ['**503** | `Service Unavailable`', 'Ебать, основной сервер отвалился. Отпиши r3t4rd#0157 или на форум - https://yufu.us/forums'],
    504: ['**504** | `DaemonConnectionException`', 'The daemon isn\'t responding. '],
    'ENOTFOUND': ['**ENOTFOUND**', 'Invalid PanelURL in config.js, no instance to make requests from.'],
    'ECONNABORTED': ['**ECONNABORTED**', 'Axios timed out (took more than 5 seconds) while sending/waiting for a response.']
}
module.exports = function(error, location) {
    const handled = errors[
        (error.response) ? error.response.status : error.code
    ];
    const obj = {
        title: {
            text: shared_embeds.error.title,
            icon: shared_embeds.error.icon
        },  
        color: shared_embeds.error.color, 
        desc: `${handled[0]}\n\n${handled[1]}${(settings.debug) ? `\n\n\`\`\`${location}\`\`\`` : ''}`,
        footer: {
            icon: shared_embeds.footer.icon,
            text: shared_embeds.footer.text
        }
    }
    if(settings.debug) {
        console.log(`Parsed error : ${(error.response) ? error.response.status : error.code} | in : ${location}`);
        console.log(error)
    }
    return obj;
}