export const animAssets = {

    /*  
        
    Pour les cercles et lignes, il est possible d'ajouter une propriété
        debug : true    pour afficher un rectangle orange de la ligne/cercle
        et aussi :
        isHiddenMobile : false      pour cacher la ligne/cercle sur mob/tablette

    */

sombre : {
    lignes :
        [
            // Début des diagonales HD-BG
            {
                id : "ligne0",
                x1 : 0,
                y1 : 224,
                x2 : 252,
                y2 : 0,
                duree : 5,
                dureeRepli : 4,
                retardRepli : 1,
                tirets : 4,
                contour : 1,
            },
            {
                id : "ligne1",
                x1 : 545,
                y1 : 0,
                x2 : 0,
                y2 : 484,
                duree : 5,
                dureeRepli : 4,
                retardRepli : 1,
                tirets : 6,
                contour : 2,
            },
            {
                id : "ligne2",
                x1 : 0, 
                y1 : 925,
                x2 : 967,
                y2 : 0,
                duree : 10,
                dureeRepli : 6,
                retardRepli : 4,
                tirets : 5,
                contour : 1,
                isHiddenMobile : false
            },
            {
                id : "ligne3",
                x1 : 485,  
                y1 : 820,
                x2 : 194,
                y2 : 1079,
                duree : 6,
                dureeRepli : 4,
                retardRepli : 2,
                tirets : 5,
                contour : 2,
                isHiddenMobile : true
            },
            {
                id : "ligne4",
                x1 : 1343, 
                y1 : 164,
                x2 : 1032,
                y2 : 440,
                duree : 4,
                dureeRepli : 3,
                retardRepli : 1,
                tirets : 4,
                contour : 1,
                isHiddenMobile : false
            },
            {
                id : "ligne5",
                x1 : 681, 
                y1 : 1079,
                x2 : 1344,
                y2 : 491,
                duree : 5,
                dureeRepli : 3,
                retardRepli : 2,
                tirets : 5,
                contour : 2,
                isHiddenMobile : false
            },
            {
                id : "ligne6",
                x1 : 1130, 
                y1 : 1078,
                x2 : 1344,
                y2 : 888,
                duree : 4,
                dureeRepli : 3,
                retardRepli : 2,
                tirets : 4,
                contour : 1,
                isHiddenMobile : false
            },
            // Début des diagonales HG-BD
            {
                id : "ligne7",
                x1 : 1343, 
                y1 : 304,
                x2 : 1002,
                y2 : 0,
                duree : 5,
                dureeRepli : 3,
                retardRepli : 2,
                tirets : 5,
                contour : 2,
                isHiddenMobile : false
            },
            {
                id : "ligne8",
                x1 : 1344, 
                y1 : 718,
                x2 : 761,
                y2 : 200,
                duree : 9,
                dureeRepli : 6,
                retardRepli : 3,
                tirets : 6,
                contour : 1,
                isHiddenMobile : false
            },
            {
                id : "ligne9",
                x1 : 1014, 
                y1 : 604,
                x2 : 1344,
                y2 : 897,
                duree : 5,
                dureeRepli : 3,
                retardRepli : 2,
                tirets : 5,
                contour : 2,
                isHiddenMobile : false
            },
            {
                id : "ligne10",
                x1 : 64, 
                y1 : 0,
                x2 : 530,
                y2 : 414,
                duree : 10,
                dureeRepli : 10,
                retardRepli : 0,
                tirets : 4,
                contour : 1,
                isHiddenMobile : true
            },
            {
                id : "ligne11",
                x1 : 289, 
                y1 : 648,
                x2 : 776,
                y2 : 1080,
                duree : 6,
                dureeRepli : 4,
                retardRepli : 2,
                tirets : 4,
                contour : 2,
            },
            {
                id : "ligne12",
                x1 : 420, 
                y1 : 1079,
                x2 : 119,
                y2 : 808,
                duree : 5,
                dureeRepli : 4,
                retardRepli : 1,
                tirets : 4,
                contour : 1,
            }
        ],
    cercles : 
        [
            {
                id : "cercle1",
                y:604,
                x:1014,
                rayon:25,
                duree: 3,
                rotation : 225,
                reversed : true,
                tiret : 5
            },
            {
                id : "cercle2",
                y:604,
                x:1014,
                rayon:135,
                duree: 6,			
                rotation : 45,
                reversed : false,
                tiret : 5
            },
            {
                id : "cercle3",
                y:400,
                x:88,
                rayon:283,
                duree: 6,
                rotation : 180,
                reversed : false,
                tiret : 8
            },
            {
                id : "cercle4",
                y:-480,
                x:1532,
                rayon:800,
                duree: 9,
                rotation : 200,
                reversed : false,
                tiret : 5
            },
            {
                id : "cercle5",
                y:317,
                x:-486,
                rayon:1000,
                duree: 6,
                rotation : 130,
                reversed : false,
                tiret : 5
            },
            {
                id : "cercle6",
                y:1480,
                x:799,
                rayon: 700,
                duree: 6,
                rotation : 190,
                reversed : false,
                tiret : 8
            },
            {
                id : "cercle7",
                y:720,
                x:1038,
                rayon: 700,
                duree: 6,
                rotation : 10,
                reversed : false,
                tiret : 5
            }
        ],
        options : {
            sigleType : 'plain',
            bgColor : '#005476',
            linesColor : "white",
            title : undefined,
        }
    }, //////////////////////// CLAIR /////////////////////////////////
    get sombreMobile () { 
        return {
            ...this.sombre, 
            options : {
                sigleType : 'pointilles',
                bgColor : '#D9E7EC',
                linesColor : '#005476',
                title : "Fiches Produits",
            }
        }
    },
    clair : {
        lignes : [
            // Début des diagonales HD-BG
            {
                id : "ligne0",
                x1 : 0,
                y1 : 224,
                x2 : 252,
                y2 : 0,
                duree : 5,
                dureeRepli : 4,
                retardRepli : 1,
                tirets : 4,
                contour : 1,
            },
            {
                id : "ligne1",
                x1 : 545,
                y1 : 0,
                x2 : 0,
                y2 : 484,
                duree : 5,
                dureeRepli : 4,
                retardRepli : 1,
                tirets : 6,
                contour : 2,
            },
            {
                id : "ligne2",
                x1 : 0, 
                y1 : 925,
                x2 : 967,
                y2 : 0,
                duree : 10,
                dureeRepli : 6,
                retardRepli : 4,
                tirets : 5,
                contour : 1,
            },
            {
                id : "ligne3",
                x1 : 485,  
                y1 : 820,
                x2 : 194,
                y2 : 1079,
                duree : 6,
                dureeRepli : 4,
                retardRepli : 2,
                tirets : 5,
                contour : 2,
            },
            {
                id : "ligne4",
                x1 : 1343, 
                y1 : 164,
                x2 : 1032,
                y2 : 440,
                duree : 4,
                dureeRepli : 3,
                retardRepli : 1,
                tirets : 4,
                contour : 1,
                isHiddenMobile : false
            },
            {
                id : "ligne5",
                x1 : 681, 
                y1 : 1079,
                x2 : 1344,
                y2 : 491,
                duree : 5,
                dureeRepli : 3,
                retardRepli : 2,
                tirets : 5,
                contour : 2,
                isHiddenMobile : false	
            },
            {
                id : "ligne6",
                x1 : 1130, 
                y1 : 1078,
                x2 : 1344,
                y2 : 888,
                duree : 4,
                dureeRepli : 3,
                retardRepli : 2,
                tirets : 4,
                contour : 1,
                isHiddenMobile : false
            },
            // Début des diagonales HG-BD
            {
                id : "ligne7",
                x1 : 1343, 
                y1 : 304,
                x2 : 1002,
                y2 : 0,
                duree : 5,
                dureeRepli : 3,
                retardRepli : 2,
                tirets : 5,
                contour : 2,
                isHiddenMobile : false
            },
            {
                id : "ligne8",
                x1 : 1344, 
                y1 : 718,
                x2 : 761,
                y2 : 200,
                duree : 7,
                dureeRepli : 5,
                retardRepli : 2,
                tirets : 6,
                contour : 1,
                isHiddenMobile : false
            },
            {
                id : "ligne9",
                x1 : 1049, 
                y1 : 604,
                x2 : 1379,
                y2 : 897,
                duree : 5,
                dureeRepli : 3,
                retardRepli : 2,
                tirets : 5,
                contour : 2,
                isHiddenMobile : false
            },
            {
                id : "ligne10",
                x1 : 64, 
                y1 : 0,
                x2 : 530,
                y2 : 414,
                duree : 10,
                dureeRepli : 10,
                retardRepli : 0,
                tirets : 4,
                contour : 1,
            },
            {
                id : "ligne11",
                x1 : 289, 
                y1 : 648,
                x2 : 776,
                y2 : 1080,
                duree : 6,
                dureeRepli : 4,
                retardRepli : 2,
                tirets : 4,
                contour : 2,
            },
            {
                id : "ligne12",
                x1 : 420, 
                y1 : 1079,
                x2 : 119,
                y2 : 808,
                duree : 5,
                dureeRepli : 4,
                retardRepli : 1,
                tirets : 4,
                contour : 1,
            }
        ],    
        cercles : [
            {
                id : "cercle1",
                y:604,
                x:1049,
                rayon:25,
                duree: 3,
                rotation : 225,
                reversed : true,
                tiret : 5,
                isHiddenMobile : false
            },
            {
                id : "cercle2",
                y:604,
                x:1049,
                rayon:110,
                duree: 6,			
                rotation : 45,
                reversed : false,
                tiret : 5,
                isHiddenMobile: true
            },
            {
                id : "cercle3",
                y:400,
                x:88,
                rayon:283,
                duree: 6,
                rotation : 180,
                reversed : false,
                tiret : 8,
                isHiddenMobile : false
            },
            {
                id : "cercle4",
                y:-480,
                x:1532,
                rayon:800,
                duree: 9,
                rotation : 200,
                reversed : false,
                tiret : 5,
                isHiddenMobile: true
            },
            {
                id : "cercle5",
                y:317,
                x:-486,
                rayon:900,
                duree: 6,
                rotation : 130,
                reversed : false,
                tiret : 5
            },
            {
                id : "cercle6",
                y:1480,
                x:799,
                rayon: 700,
                duree: 6,
                rotation : 190,
                reversed : false,
                tiret : 5
            },
            {
                id : "cercle7",
                y:720,
                x:1038,
                rayon: 650,
                duree: 6,
                rotation : 10,
                reversed : false,
                tiret : 5
            }
        ],
        options : {
            sigleType : 'pointilles',
            bgColor : '#D9E7EC',
            linesColor : '#005476',
            title : "Fiches Produits",
        }
    },
    get concept () { 
        return {
            ...this.clair,
            options : {
                sigleType : 'concept',
                bgColor : '#38454b',
                linesColor : '#fff',
                title : "Edra Concept",
            }
        }
    }
}