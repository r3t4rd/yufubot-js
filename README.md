![YUFUBOT-JS Logo](https://cdn.wisp.gg/uploaded_assets/pnl.yufu.us/7aee170234b083962d1e6eeb98a6897a159e1a19893ddbaad906f876a4457ac2.png)

# YUFUBOT-JS

It's just yet another one discord bot for using with api at: [(yufu panel)](https://pnl.yufu.us).

This supports both the client and administration API.
Able to use as:
* Community
* Hostinger

Community is just for simply querying the game server.
Hostinger as manipulating nodes, users, servers, locations, nests, etc.
That's all is configurable.
The client and admin side can be toggled aka on/off individually.

## Require

* Node.js 12+
* yufu server 8)

## Community API <sup><sub>Note: Some commands may not work with certaint server typo.</sub></sup>

* Multiple servers
* Role bases permissions
* Sevver status
* Player list
* Turn the server on/off/etc
* Send commands to server console

## Hostinger API:

* Role based permissions system
* Commands (later) - 40+ to manipulate nodes/users/servers/locations/nests

## cmds all
```js
Key

() = Required
[] = Optional
{} = Data

Data is provided in this format 
parameter=value parameter2="another value"


Users

!user list
!user get (id)
!user create {}
!user edit (id) {}
!user delete (id,ids)


Nodes

!node list
!node get (id)
!node edit (id) {}
!node delete (id,ids) soon™️
!node allocations list (id)
!node allocation create {}
!node allocation delete (id,ids)


Locations

!location list
!location get (id)
!location create {}
!location edit (id) {}
!location delete (id,ids)


Nests/Eggs

!nest list
!nest get (id)
!nest list eggs (id)
!nest get egg (nest-id) (egg-id)


Servers

!server list
!server get (id/identifier)
!server get details (id/identifier)
!server get limits (id/identifier)
!server get container (id/identifier)
!server edit details (id/identifier) {}
!server edit limits (id/identifier) {}
!server edit container (id/identifier) {}
!server clone (id) (newallocationid)
!server create [template] {}
!server save (id/identifier) (name)
!server suspend (id,ids)
!server unsuspend (id,ids)
!server rebuild (id,ids)
!server reinstall (id,ids)
!server database list (id)
!server database get (id) (dbid)
!server database create (id) (name) (host) [rule]
!server database delete (id) (dbid,dbids)
!server database reset-password (id) (dbid)
```

## Installation

Actually, just create discord.js server in panel and put url to this git. All done.

## Setup

Rename the `example-config` directory to `config`

* Authorization | Required | `/config/authorization.js`
* Settings | Required | `/config/settings.js`
* Server Aliases | Client Side Only | `/config/aliases.js`
* Permissions | Required(side based) | `/config/permissions/(client/admin).js`

Configuration is important.

```bash
node index.js
```