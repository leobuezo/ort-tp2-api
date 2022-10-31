
export class NotImplemented extends Error{

    //Se debe usar este error cuando no se esta implementando un endpoint en particular
    //suele usarse ya que no se esta trabajando sobre esta funcionalidad al momento,
    //pero la idea es usarlo en un futuro

    constructor(message){
        super(message)
    }
}