new Vue({
    el: '#app',
    data: {
        isStart: false,
        histories: [],
        myBar: {
            health: 100,
            attack: 0,
            heal: 15
        },
        monsterBar: {
            health: 100,
            attack: 0
        },
        begin: {
            mybar: {},
            monsterbar: {}
        }
    },
    watch: {
        monsterHealth: function(){
            if(this.monsterHealth <= 0){
                alert('You win')
                this.resetGame()
            }
        },
        myHealth: function(){
            if(this.myHealth <= 0){
                alert('You Lose')
                this.resetGame()
            }
        }
    },
    computed: {
        logHit: function(){
            this.histories.push(`You hit ${this.myBar.attack}`)
        },
        logDamaged: function(){
            this.histories.push(`Damaged ${this.monsterBar.attack}`)
        },
        logHeal: function(){
            this.histories.push(`You Heal ${this.myBar.heal}`)
        },
        myHealth: function(){
            return this.myBar.health
        },
        monsterHealth: function(){
            return this.monsterBar.health
        },
        
    },
    methods: {
        startGame: function(){
            this.isStart = true
            this.begin.mybar = {
                health: 100,
                attack: 0,
                heal: 15
            }
            this.begin.monsterbar = {
                health: 100,
                attack: 0
            }
        },
        damaged: function(){
            this.monsterBar.attack = Math.round(Math.random()*10)*1.5
            this.myBar.health -= this.monsterBar.attack
            this.logDamaged
        },
        hit: function(){
            this.myBar.attack = Math.round(Math.random()*10)
            this.monsterBar.health -= this.myBar.attack
            this.logHit
            this.damaged()
        },
        spHit: function(){
            let chance = Math.random()*10
            if(chance > 5){
                this.myBar.attack = Math.round(Math.random()*10)*2
            }else{
                this.myBar.attack = Math.round(Math.random()*10)
                console.log('It failed')
            }
            this.monsterBar.health -= this.myBar.attack
            this.logHit
            this.damaged()
        },
        heal: function(){
            if(this.myBar.health != 100){
                this.myBar.health += this.myBar.heal
                this.logHeal
                this.damaged()
            }else{
                console.log("it doesn't affect")
            }
        },
        resetGame: function(){
            this.isStart = false
            this.myBar = this.begin.mybar
            this.monsterBar = this.begin.monsterbar
            this.histories = []
            console.log(this.begin)
        },
        giveUp: function(){
            let condition = confirm("are you sure ?")
            if(condition == true){
                alert('You Gave Up')
                this.resetGame()
            }
        }
    }
})