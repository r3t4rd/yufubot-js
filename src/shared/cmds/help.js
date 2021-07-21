const util = require(`${process.env.root}/src/util`);
const settings = require(`${process.env.root}/config/settings`);

function clientHelp() {
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.desc = `**Основные команды**\n\`\`\`${settings.prefix}help | Вы находитесь здесь. Поздравляем!\n${settings.prefix}servers | Выдаст полный список игровых серверов к которым у тебя есть доступ.\`\`\`\n**Серверные команды**\nТак, здесь будь несколько аккуратнее. Эти команды используются для взаимодействия с сервером. Включить, выключить и всё такое. Выглядит, собственно, следующим образом: \n\n\`${settings.prefix}alias [cmd] <args>\`\n\`\`\`${settings.prefix}alias [status] | Выдаст детальную инфу о сервере.\n${settings.prefix}alias [players] | Список игроков.\n${settings.prefix}alias [power] <signal> | Выключить-включить .\n${settings.prefix}alias [cmd] <command> | Отправить команду в консоль.\n${settings.prefix}alias [lua] <command> | Если сервер - GarrysMod, то отправит код на сервер.\`\`\``;

    return obj;
}

function adminHelp() {
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.desc = `Так, друг, я тебя поздравляю с получением прав технического админстратора сервера, а то и выше. Бот крайне крутой и может ну очень много, так что, **пожалуйста, будь аккуратен при использовании команд**. \n\n**Команды не для всех..**\nТак, здесь очень много подкоманд, так что проверяй help меню для каждой команды перед использованием.\n\`\`\`${settings.prefix}location help\n${settings.prefix}nest help\n${settings.prefix}node help\n${settings.prefix}server help\n${settings.prefix}user help\`\`\``;
    return obj;
}

function sharedHelp() {
    obj = util.baseEmbedObj(["shared", "help"])
    obj.desc = `Так. Этот одновременно находится и в режиме клиента и технического администратора.\n
    Собственно, какие именно команды тебя интересуют?\n
    \`\`\`!help client\n!help admin\`\`\``;
    return obj;
}

function noModule() {
    obj = util.baseEmbedObj(["shared", "error"])
    obj.title.text = `НЕТ МОДУЛЕЙ!1!11!`;
    obj.desc = `Ни один из режимов не был включен. Бот чисто поржать здесь сидит.`;
    return obj;
}
function missingModule(module) {
    obj = util.baseEmbedObj(["shared", "error"])
    obj.title.text = `МОДУЛЬ НЕ ЗАГРУЖЕН11!11!`
    obj.desc = `Это самое, \`${module}\` оказался выключен. Уж извини.`;
    return obj;
}

function unknownMenu(module) {
    obj = util.baseEmbedObj(["shared", "error"])
    obj.title = `чево...`
    obj.desc = `Друг... \n\nДавай ты начнёшь с \`!help\`, ладно?`;
    return obj;
}

module.exports = async function(args) {
    if(!args[1]) {
        if(settings.enableClient && settings.enableAdmin) {
            result = await sharedHelp();
        } else if(settings.enableClient && !settings.enableAdmin) {
            result = await clientHelp();
        } else if(!settings.enableClient && settings.enableAdmin) {
            result = await adminHelp();
        } else {
            result = await noModule()
        }
    } else if(args[1] == "client") {
        if(settings.enableClient) {
            result = await clientHelp();
        } else {
            result = await missingModule("client");
        }
    } else if(args[1] == "admin") {
        if(settings.enableAdmin) {
            result = await adminHelp();
        } else {
            result = await missingModule("admin");
        }
    } else {
        result = await unknownMenu();
    }
    return result;
}