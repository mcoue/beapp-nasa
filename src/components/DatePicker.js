import {Button} from "react-native-paper";
import {View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from "react";

import {datePickerStyle} from "../styles";

const DatePicker = ({ handleSearchPicture, handleCleanSearch, searchPicture }) => {
    // State to store the selected date and the visibility of the date picker.
    let [datePicker, setDatePicker] = useState(new Date());
    let [showPicker, setShowPicker] = useState(false);

    // Function to handle changes in the date picker.
    const onChangeDatePicker = ({ type }, selectedDate) => {
        // Close the date picker when a date is selected.
        setShowPicker(false);

        if (type === "set") {
            // Update the selected date and trigger the search action.
            setDatePicker(selectedDate);
            handleSearchPicture(selectedDate);
        }
    };

    return (
        <View style={datePickerStyle()}>
            <Button
                mode="contained"
                style={{marginEnd: 5}}
                onPress={() => setShowPicker(true)}
            >Search picture</Button>
            <Button
                mode="contained"
                disabled={!searchPicture}
                style={{marginStart: 5}}
                onPress={handleCleanSearch}
            ><Icon name="trash-can" size={17}/></Button>
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={datePicker}
                    onChange={onChangeDatePicker}
                    maximumDate={new Date()}
                />
            )}
        </View>
    );
};

export default DatePicker;