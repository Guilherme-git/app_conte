import React, { useState } from "react";

import {
    Container,
} from './style';

export default ({placeholder, secureTextEntry, value, onChangeText,keyboardType}) => {
    return (
        <Container
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder} 
            secureTextEntry={secureTextEntry} 
            keyboardType={keyboardType}
        />
    );
}