// priority: 0

onEvent('server.load', event => {
  let server = event.getServer()
  server.runCommandSilent("scoreboard objectives add SkillPoints dummy \"Skill Points\"")
  server.runCommandSilent("scoreboard objectives add TotalSkillPoints dummy \"Total Skill Points\"")
  server.runCommandSilent("scoreboard objectives add UsedSkillPoints dummy \"Used Skill Points\"")
})
onEvent('server.tick', event => {
  let server = event.getServer()
  server.runCommandSilent('title @a[scores={SkillPoints=2..}] actionbar ["",{"score":{"name":"*","objective":"SkillPoints"},"color":"#af8cf5"},{"text":" unused skill points","color":"#af8cf5"}]')
  server.runCommandSilent('title @a[scores={SkillPoints=1}] actionbar ["",{"text":"1 unused skill point","color":"#af8cf5"}]')
  server.runCommandSilent('ftbquests change_progress @a reset 10F0F0F0F0F0F000')
  server.runCommandSilent('ftbquests change_progress @a[scores={SkillPoints=1..}] complete 10F0F0F0F0F0F001')
  server.runCommandSilent('ftbquests change_progress @a[scores={SkillPoints=2..}] complete 10F0F0F0F0F0F002')
})

onEvent('player.inventory.changed', event => {
  if(event.item.id != "kubejs:skill_point") return
  event.player.runCommandSilent("clear @s kubejs:skill_point")
  event.player.runCommandSilent("scoreboard players add @s TotalSkillPoints "+event.item.count)
  event.player.runCommandSilent("scoreboard players add @s SkillPoints "+event.item.count)
  event.player.runCommandSilent('ftbquests change_progress @s reset 10F0F0F0F0F0F000')
  event.player.runCommandSilent('ftbquests change_progress @s[scores={SkillPoints=1..}] complete 10F0F0F0F0F0F001')
  event.player.runCommandSilent('ftbquests change_progress @s[scores={SkillPoints=2..}] complete 10F0F0F0F0F0F002')
})
deepSearch = function(object, lookingFor, maxLevel, prefix) {
  if(maxLevel == 0) return
  for(key in object) {
    newPrefix = prefix+"."+key
    if(!key || !object[key]) continue
    if((key + " ][ " + object[key]).toLowerCase().indexOf(lookingFor.toLowerCase())!=-1) console.info((newPrefix + " ][ " + object[key]).replace(/\n/g, " "))
    try {deepSearch(object[key], lookingFor, maxLevel-1, newPrefix)} catch(error) {continue}
  }
}