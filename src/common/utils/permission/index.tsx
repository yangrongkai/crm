'use strict'


export const authorizePermission = (auth: string, permissionList: string[], element: JSX.Element , isPassed: boolean = false): JSX.Element | undefined => {
    if(isPassed){
        return element
    } else {
        for(let index in permissionList){
            let obj = permissionList[index]
            if(obj.indexOf(auth) > -1){
                return element
            }
        }
        return undefined
    }
}
