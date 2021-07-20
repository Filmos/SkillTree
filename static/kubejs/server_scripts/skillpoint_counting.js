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
})

onEvent('player.inventory.changed', event => {
  if(event.item.id != "kubejs:skill_point") return
  event.player.runCommandSilent("clear @s kubejs:skill_point")
  event.player.runCommandSilent("scoreboard players add @s TotalSkillPoints "+event.item.count)
  event.player.runCommandSilent("scoreboard players add @s SkillPoints "+event.item.count)
})