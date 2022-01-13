const maps = {
    chill: new GameMap([700,700], [
        new GameObject({
            name:"wall",
            mapName: "dev",
            pos: [0,-200],
            size: [100,100],
            height: 1
        }),
        new GameObject({
            name:"wall",
            mapName: "dev",
            pos: [0,200],
            size: [100,100],
            height: 1
        })
    ],
    {
        red: [-200,0],
        blue: [200,0]
    },1 , "chill"),

    not_chill: new GameMap([700,700], [
        new GameObject({
            name:"wall",
            mapName: "dev",
            pos: [0,-200],
            size: [100,100],
            height: 1
        }),
        new GameObject({
            name:"wall",
            mapName: "dev",
            pos: [0,200],
            size: [100,100],
            height: 1
        }),
        new GameObject({
            name:"wall",
            mapName: "dev",
            pos: [100,-200],
            size: [100,100],
            height: 1
        }),
        new GameObject({
            name:"wall",
            mapName: "dev",
            pos: [100,200],
            size: [100,100],
            height: 1
        })
    ],
    {
        red: [-200,0],
        blue: [200,0]
    },1 , "not_chill"),

    //dev: new GameMap([1500,1500], [
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-100,0],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [100,0],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [0,0],
    //        size: [100,100],
    //        height: 1
    //    })
    //],
    //{
    //    red: [-200,0],
    //    blue: [200,0]
    //},1),
//
    //duelDev: new GameMap([700,700], [
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [0,100],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [0,-100],
    //        size: [100,100],
    //        height: 1,
    //    }),
//
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [0,0],
    //        size: [100,100],
    //        height: 2
    //    }),
//
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-300,0],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-300,100],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-300,-100],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-300,200],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-300,-200],
    //        size: [100,100],
    //        height: 1,
    //    })
    //    ,
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-300,300],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-300,-300],
    //        size: [100,100],
    //        height: 1,
    //    }),
//
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [300,0],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [300,100],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [300,-100],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [300,200],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [300,-200],
    //        size: [100,100],
    //        height: 1,
    //    })
    //    ,
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [300,300],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [300,-300],
    //        size: [100,100],
    //        height: 1,
    //    }),
//
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [0,300],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [100,300],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [200,300],
    //        size: [100,100],
    //        height: 1,
    //    }),new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-100,300],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-200,300],
    //        size: [100,100],
    //        height: 1,
    //    }),
//
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [0,-300],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [100,-300],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [200,-300],
    //        size: [100,100],
    //        height: 1,
    //    }),new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-100,-300],
    //        size: [100,100],
    //        height: 1,
    //    }),
    //    new GameObject({
    //        name: "wall",
    //        mapName: "dev",
    //        pos: [-200,-300],
    //        size: [100,100],
    //        height: 1,
    //    })
    //],
    //{
    //    red: [-200,0],
    //    blue: [200,0]
    //}, 1),
//
    //desertDuel: new GameMap(
    //    [1500,1500],
//
    //    [
    //        new GameObject({
    //            name: "wall",
    //            mapName: "desert",
    //            pos: [-200,-200],
    //            size: [100,100],
    //            color: `rgb(207,90,0)`,
    //            height: 2,
    //        }),
//
    //        new GameObject({
    //            name: "long_wall",
    //            mapName: "desert",
    //            pos: [-250,-300],
    //            size: [200,100],
    //            color: `rgb(207,90,0)`,
    //            height: 1,
    //        }),
//
    //        new GameObject({
    //            name: "road",
    //            mapName: "desert",
    //            pos: [-200,-400],
    //            size: [100,100],
    //            height: 0,
    //            color: "red",
    //            isBack: true
    //        }),
    //        new GameObject({
    //            name: "road",
    //            mapName: "desert",
    //            pos: [-200,-500],
    //            size: [100,100],
    //            height: 0,
    //            color: "red",
    //            isBack: true
    //        }),
//
    //        new GameObject({
    //            name: "paper",
    //            mapName: "desert",
    //            pos: [-200,-400],
    //            size: [100,100],
    //            height: 0.001,
    //            color: "red",
    //            isBack: true
    //        }),
//
    //        new GameObject({
    //            name: "door",
    //            mapName: "desert",
    //            pos: [-200,-360],
    //            size: [81,20],
    //            height: 1,
    //            color: `rgb(153,139,0)`,
    //            isBack: false
    //        })
    //    ],
//
    //    {
    //        red: [-200,200],
    //        blue: [200,-200]
    //    },
//
    //    1
    //)

}