package com.hl.pojo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @author xs
 * @date 2021/04/01 13:33
 */
@PropertySource(value = "classpath:/configs.properties")
@Component
public class ConfigsPoJo {
    @Value("${placeImagesPath}")
    private String placeImagesPath;

    public String getPlaceImagesPath() {
        return placeImagesPath;
    }

    public void setPlaceImagesPath(String placeImagesPath) {
        this.placeImagesPath = placeImagesPath;
    }
}
