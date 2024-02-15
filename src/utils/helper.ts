import { BucketObject } from "../types/bucketObject.js"
import { TODO } from "../types/todo.js"

export function sortObjects(objects: BucketObject[]): BucketObject[]{
    /*
        -Condition d'arrêt
        -Elle s'appelle elle-même
        -Contexte de récursivité
    */
    let folders: BucketObject[] = []
    let files: BucketObject[] = []

    for(let object of objects){
        let levels: string[] = object.Key.split('/')
        if(levels.length > 1){  
            //FOLDER
            let fileInFolder: BucketObject = {
                Key: levels.slice(1).join('/'), 
                FullKey: object.FullKey ?? object.Key,
                Size: object.Size,
                LastModified: object.LastModified
            }
            const folderIndex: number = folders.findIndex(folder => folder.Key == levels[0])
            if(folderIndex == -1){
                //On ajoute le dossier à la liste des dossiers


                let newFolder: BucketObject = {
                    Key: levels[0] || 'errorReadingFolder',
                    FullKey: '', 
                    Size: 0,
                    Files: [fileInFolder]
                }
                
                let needContinue: boolean = true
                
                for(let levelName of (object.FullKey || object.Key).split('/')){
                    if(needContinue){
                        if(levelName == levels[0]){
                            needContinue = false
                            newFolder.FullKey += levelName
                        } else {
                            newFolder.FullKey += levelName + '/'
                        }
                    }
                }

                folders = [...folders, newFolder]
            } else {
                //On edit le dossier
                folders[folderIndex]!.Files?.push(fileInFolder)
            } 
        } else {
            files.push(object)
        }
    }

    for(let folder of folders){
        folder.Files = sortObjects(folder.Files ?? [])
    }

    return [...folders, ...files]
}

export function getBucketObject(fullKey: string, objects: BucketObject[]): BucketObject | void {

    let levels: string[] = fullKey.split('/')

    if(levels.length > 1){
        let folder: BucketObject | void = getBucketObject(levels[0] || "", objects)
        return folder?.Files ? getBucketObject(levels.slice(1).join('/'), folder.Files) : undefined
    } else {
        return objects.find((obj)=> obj.Key === fullKey)
    }

}

export function searchFilter<T extends BucketObject | string>(filterKey: string, items: T[]): T[]{

    let top: T[] = []
    let middle: T[] = []
    //let bottom: BucketObject[] = []

    for(let item of items){
        let index: number = -1
        if(typeof(item) == "string"){
            index = item.toLowerCase().indexOf(filterKey.toLowerCase())
        } else {
            index = item.Key.toLowerCase().indexOf(filterKey.toLowerCase())
        }
        
        
        const cases: {default: () => void, [key: number | string]: () => void} = {
            [-1]: () => null,
            [0]: () => top = [...top, item],
            default: () => middle = [...middle, item]
        }

        const putObject: () => void = cases[index] ?? cases.default
        putObject()
    }

    return [...top, ...middle]
}