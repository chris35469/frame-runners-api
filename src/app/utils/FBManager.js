import { getData, setData, getSortedData } from './firebase'

export class FBManager {
    constructor(player_info) {
        this.player_info = player_info
    }

    async init() {
        //Check if player in 
        let user_path = `players/${this.player_info.fid}`
        let playerInfo = await getData(user_path)
        //console.log(playerInfo)

        if (playerInfo == null) {
            this.player_info.joined = Date.now()
            setData(user_path, this.player_info)
        }
    }

    async isPlayerBetting() {
        let playerInfo = await getData(`current_bets/players/${this.player_info.fid}`)
        return playerInfo
    }

    getPlayerInfo() {
        return this.player_info
    }

    storeBet(input) {
        this.player_info.bet = input
        let bet_path = `current_bets/${input}/${this.player_info.fid}`
        this.player_info.bet_time = Date.now()

        // Add bet to current bets
        setData(bet_path, this.player_info)
        // Add players to current bettors
        setData(`current_bets/players/${this.player_info.fid}`, this.player_info)
    }

    async getRaceStandings() {
        let current_race = await getSortedData("current_race", "horse_place", "desc")
        return current_race
    }
}