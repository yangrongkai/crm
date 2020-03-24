'use strict'


export interface MenuElementInterface {
    key: string;
    name: string;
    icon?: any;
    child?: MenuElementInterface[];
    router?: string;
    url?: string;
};

export class MenuElement implements MenuElementInterface{

    key: string;
    name: string;
    path: string;
    level: number;
    icon?: any;
    parent?: MenuElement | null;
    child?: MenuElement[];
    url?: string;
    router?: string;

    constructor(key: string, name: string, path: string, level: number = 0, 
        icon?: any, router?: string, url?: string){
        this.key = key;
        this.name = name;
        this.path = path;
        this.level = level;
        this.icon = icon || null;
        this.router = router || "";
        this.url = url || "";
        this.parent = null;
        this.child = [];
    }

    setParent(menuElement: MenuElement){
        this.parent = menuElement;
    }

    addChild(menuElement: MenuElement){
        this.child.push(menuElement);
    }

    getChild(){
        return this.child;
    }

};


export class MenuElementHelper {

    root: MenuElement;
    elementMap: Map<string, MenuElement>;

    constructor(menuList: MenuElementInterface[]){
        let { rootElement, elementMap } = this.load(menuList);
        this.root = rootElement;
        this.elementMap = elementMap;
    }

    load(menuList: MenuElementInterface[]): any {
        let elementMap = new Map();
        let unitLoad = (element: MenuElement, item: MenuElementInterface, level: number) => {
            let menuElement = new MenuElement(
                item.key,
                item.name,
                element.path + "/" + item.key,
                level,
                item.icon,
                item.router,
                item.url
            );
            element.addChild(menuElement);
            menuElement.setParent(element);
            elementMap.set(menuElement.path, menuElement);

            if( item.child ){
                for( let subItem of item.child ){
                    unitLoad(menuElement, subItem, menuElement.level + 1);
                }
            }
        }

        const rootElement = new MenuElement("root", "根节点", '/root', 0);
        for( let menu of menuList ){
            unitLoad(rootElement, menu, rootElement.level + 1);
        }
        return {
            rootElement,
            elementMap
        };
    }

    getElementByLevel(level: number): MenuElement[]{
        let elementList = []
        for(let key of this.elementMap.keys()){
            let element = this.elementMap.get(key);
            if( element.level === level ){
                elementList.push(element);
            }
        }
        return elementList;
    }

}
