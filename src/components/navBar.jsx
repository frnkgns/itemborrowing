function NavBar({ onToggleShowAddItems }){
    return(
        <div className="flex justify-between text-xl bg-gray-900 text-white font-semibold p-10">
            <p>SPORTS</p>
            <div className="space-x-10">
                {/* <button className="font-medium text-white hover:text-green-300">Register</button> */}
                <button className="font-medium text-white hover:text-sky-300">Students</button>
                <button onClick={onToggleShowAddItems} className="font-medium text-white hover:text-sky-300">Items</button>
            </div>
        </div>
    );
}

export default NavBar;