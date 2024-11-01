import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const SelectSearch = ({ data, title, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [limitTags, setLimitTags] = useState(2);

  useEffect(() => {
    setSelectedOptions([...data]);
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setLimitTags(window.innerWidth <= 1024 ? 1 : 2);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e, newValue) => {
    const isCheckAllSelected = newValue.some((option) => option.name === "ทั้งหมด");

    if (isCheckAllSelected) {
      const updatedOptions = selectedOptions.length === data.length ? [] : [...data];
      setSelectedOptions(updatedOptions);
      onChange(updatedOptions.map(item => item.name));
    } else {
      setSelectedOptions(newValue);
      onChange(newValue.map(item => item.name));
    }
  };

  return (
    <Autocomplete
      limitTags={limitTags}
      multiple
      options={[{ name: "ทั้งหมด" }, ...data]}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      value={selectedOptions}
      onChange={handleChange}
      sx={{
        paddingTop: '8px',
        '& .MuiAutocomplete-inputRoot': {
          width: '100%', // ให้ใช้ความกว้างเต็ม
        },
        '& .MuiAutocomplete-input': {
          width: '100%', // ให้ input ใช้ความกว้างเต็ม
          minWidth: '0px', // กำหนดความกว้างขั้นต่ำ
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#D0D0D0",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
        },
        "& .MuiInputLabel-root": {
          color: "#757575",
        },
        "& .Mui-focused .MuiInputLabel-root": {
          color: "#2A777F",
        },
      }}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              style={{ marginRight: 2 }}
              checked={option.name === "ทั้งหมด" ? selectedOptions.length === data.length : selected}
            />
            {option.name}
          </li>
        );
      }}
      renderTags={(value, getTagProps) => {
        const maxLength = 13; 
        return value.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          const displayText = option.name.length > maxLength
            ? `${option.name.substring(0, maxLength)}...`
            : option.name;
          return (
            <Chip
              key={key}
              {...tagProps}
              label={displayText}
              style={{
                background: "#e0e0e0",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
              }}
            />
          );
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={title === "โรค" ? "เลือกกลุ่มโรค" : "เลือกสถานพยาบาล"}
          placeholder=""
          InputProps={{
            ...params.InputProps,
            startAdornment:
              selectedOptions.length === data.length ? "ทั้งหมด" : params.InputProps.startAdornment
          }}
        />
      )}
    />
  );
};

export default SelectSearch;
