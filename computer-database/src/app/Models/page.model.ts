export class Page{
  currentPage: number;
  nbPage: number;
  itemsByPage: number;
  order: string;
  ascending: string;

  constructor(
    currentPage?: number,
    nbPage?: number,
    itemsByPage?: number,
    order?: string,
    ascending?: string) {
      if(currentPage){
        this.currentPage = currentPage;
      }
      if(nbPage){
        this.nbPage = nbPage;
      }
      if(itemsByPage){
        this.itemsByPage = itemsByPage;
      }
      if(order){
        this.order = order;
      }
      if(ascending){
        this.ascending = ascending;
      }
    }

  setNbPage(nbPage: number){
    if(nbPage > 0){
      this.nbPage = nbPage;
    } else {
      this.nbPage = 1;
    }
  }

  setItemsByPage(itemsByPage: number){
    if(itemsByPage > 0){
    this.itemsByPage = itemsByPage;
    } else {
      this.itemsByPage = 25;
    }
  }   
  
  setOrder(order: string){
    switch(order){
      case "computer.id":
        this.order = order;
        break;
      case "computer.name":
        this.order = order;
        break;
      case "computer.introduced":
        this.order = order;
        break;
      case "computer.discontinued":
        this.order = order;
        break;
      case "cp.name":
        this.order = order;
        break;
      default:
        this.order = "computer.id";
        break;
    }
  }

  setAscending(ascending: string){
    if(ascending === "DESC"){
      this.ascending = "DESC";
    } else {
      this.ascending = "ASC";
    }
  }

  setCurrentPage(currentPage: number){
    if(currentPage > 0 && (!this.nbPage || this.nbPage > currentPage)){
      this.currentPage = currentPage;
    } else {
      this.currentPage = 1;
    }
  }
}
