export function random(len: number) {

    let randomVal = "qwertyuioplkjhgfdsa1234567890"
    let length = randomVal.length
    let ans = ""
    for (let i = 0; i < len; i++) {
        ans += randomVal[Math.floor(Math.random() * length)]
    }
    return ans;
}

