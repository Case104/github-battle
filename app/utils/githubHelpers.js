import axios from 'axios'
// import { apiKey, secret} from 'keys.js'

// const param = `?client_id=${apiKey}&client_secret=${secret}`;

function getUserInfo(username = 'Case104') {
	return axios.get(`https://api.github.com/users/${username}`)
}

function getRepos(username = 'Case104'){
	return axios.get(`https://api.github.com/users/${username}/repos`);
}

function getTotalStars(repos){
	return repos.data.reduce((prev, current) => prev + current.stargazers_count, 0)
}

async function getPlayersData({login, followers}){
	try {
		const repos = await getRepos(login)
		const totalStars = await getTotalStars(repos)
		return {
			followers,
			totalStars
		}
	} catch(error) {console.warn('Error in getPlayersData function', error)}
}

function calculateScores(players){
	return [
		players[0].followers * 3 + players[0].totalStars,
		players[1].followers * 3 + players[1].totalStars
	]
}

export async function getPlayersInfo (players) {
	try {
		const info = await Promise.all(players.map((username) => getUserInfo(username)))
		return info.map((user) => user.data)
	} catch(error) {console.warn('Error in getPlayersInfo', error)}
}

export async function battle (players) {
	try {
		const playersData = await Promise.all([getPlayersData(players[0]), getPlayersData(players[1])])
		return await calculateScores(playersData)
	} catch(error) {console.warn('Error in battle function', error)}
}