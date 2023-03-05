import React, { useState } from "react";

import {
    Container,
} from './style';

export default ({placeholder, secureTextEntry}) => {
    return (
        <Container 
            placeholder={placeholder} 
            secureTextEntry={secureTextEntry} 
        />
    );
}