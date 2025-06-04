package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.sql.Timestamp;
import java.time.Instant;

import com.golab18.vidime.dto.UserDto;
import com.golab18.vidime.entity.User;

@Mapper(componentModel = "spring", imports = {Timestamp.class, Instant.class})
public interface UserMapper {
    @Mapping(target = "createdAt", expression = "java(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)")
    UserDto toDto(User user);

    @Mapping(target = "createdAt", expression = "java(userDto.getCreatedAt() != null ? Timestamp.from(Instant.parse(userDto.getCreatedAt())) : null)")
    @Mapping(target = "channels", ignore = true)
    User toEntity(UserDto userDto);
}
