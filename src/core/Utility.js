const RemoveDuplicateFromArray = (a1, a2) => {
    let _newArray = [];
    for (let index = 0; index < a1.length; index++) {
        const element = a1[index];
        let exist = false;
        for (let index = 0; index < a2.length; index++) {
            if (element.value == a2[index]) {
                exist = !exist;
            }
        }
        if (!exist) {
            _newArray.push(element);
        }
    }
    return _newArray;
}

const ArrayAddRemove = (arr, value) => {
    let selected = arr;
    const selectedIndex = arr.indexOf(value);
    let newSelected = [];

    if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, value);
    } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    return newSelected;
}

export{
    RemoveDuplicateFromArray,
    ArrayAddRemove
}