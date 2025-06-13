package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.golab18.vidime.dto.RatingDto;
import com.golab18.vidime.entity.Rating;
import java.sql.Timestamp;
import java.time.Instant;
import java.math.BigDecimal;

@Mapper(componentModel = "spring", uses = {ChannelMapper.class, VideoMapper.class}, imports = {Timestamp.class, Instant.class})
public interface RatingMapper {
    @Mapping(target = "createdAt", expression = "java(rating.getCreatedAt() != null ? rating.getCreatedAt().toString() : null)")
    RatingDto toDto(Rating rating);

    @Mapping(target = "createdAt", expression = "java(ratingDto.getCreatedAt() != null ? Timestamp.from(Instant.parse(ratingDto.getCreatedAt())) : null)")
    Rating toEntity(RatingDto ratingDto);
}
