import NavHeader from "@/components/navHeader";
import RightPanel from "@/components/rightPanel";
import test from "node:test";


interface storeItemType {
    itemId: number,
    itemName: string,
    itemCost: number,
}

let testItems: storeItemType[] = [
    {itemId: 0, itemName: 'beans', itemCost: 24},
    {itemId: 1, itemName: 'apples', itemCost: 48},
    {itemId: 2, itemName: 'chips', itemCost: 128},
    {itemId: 3, itemName: 'carrots', itemCost: 248},
    {itemId: 4, itemName: 'gravy', itemCost: 942},
    {itemId: 5, itemName: 'titos', itemCost: 1482},
    {itemId: 6, itemName: 'hershey kisses', itemCost: 3287},
    {itemId: 7, itemName: 'cereal', itemCost: 6327},
    {itemId: 8, itemName: 'noodles', itemCost: 14203},
]


export default function GamePage() {

    function Store(props: {storeItems: Array<storeItemType>}) {

        const elements = props.storeItems.map(storeItem => (
            <div className="flex flex-row justify-between" key={storeItem.itemId}>
                <p className="bg-red-200 w-12 text-center">{storeItem.itemId}</p>
                <p className="bg-blue-200 w-full text-left px-2">{storeItem.itemName}</p>
                <p className="bg-green-200 w-32 text-right px-3">{storeItem.itemCost}</p>
            </div>
        ))

        return (
            <div className="flex flex-col gap-1 hover:cursor-pointer m-2 w-full">
                {elements}
            </div>
        )
    }
    
    function GameBoard() {
        return (
            <div>
            </div>
        )
    }
    
    function GameHeader() {
        return (
            <span className="flex flex-col justify-end bg-gray-700 text-white p-2 px-3 m-2 text-end rounded-md">
                <p>leaves</p>
                <p>lps</p>
            </span>
        )
    }

    function GameComponent() {
        return (
            <>  
                <div className="flex flex-col w-auto m-4 bg-white">
                    <GameHeader />
                    <div className="flex flex-row">
                        <Store storeItems={testItems} />
                        <GameBoard />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
        <div className="flex flex-col w-[1050px]">
          {/* <MainHeader /> */}
          <main className='flex flex-row bg-black/20'>
            <div className="w-full">
              <NavHeader />
              <GameComponent />
            </div>
          </main>
        </div>
    </>
  )
}