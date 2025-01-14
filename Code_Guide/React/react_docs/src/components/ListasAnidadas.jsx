const categories = [
    {id: 1, name: 'Fruits', items: ['Apple', 'Banana']},
    {id: 2, name: 'Vegetables', items: ['Carrot', 'Lettuce']},
];

function CategoryList(){
    return (
        <ul>
            {categories.map(category=>(
                <li key={category.id}>
                    {category.name}
                    <ul>
                        {category.items.map((item, index)=>(
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}