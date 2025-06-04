package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.TagDto;
import com.golab18.vidime.entity.Tag;

@Mapper(componentModel = "spring")
public interface TagMapper {
    TagDto toDto(Tag tag);
    
    @Mapping(target = "videoTags", ignore = true)
    Tag toEntity(TagDto tagDto);
}
