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
            let fileInFolder: BucketObject = {Key: levels.slice(1).join('/'), FullKey: levels.join('/')}
            const folderIndex: number = folders.findIndex(folder => folder.Key == levels[0])
            if(folderIndex == -1){
                //On ajoute le dossier à la liste des dossiers
                let newFolder: BucketObject = {
                    Key: levels[0] || 'errorReadingFolder', 
                    Files: [fileInFolder]
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

    return [...folders, ...files]
}

export function getBucketObject(name: string, inListe: BucketObject[]): BucketObject | void {
    return inListe.find((obj)=> obj.Key === name)
}