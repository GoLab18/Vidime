package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.SubscriptionDto;
import com.golab18.vidime.entity.Subscription;
import java.sql.Timestamp;
import java.time.Instant;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ChannelMapper.class}, imports = {Timestamp.class, Instant.class})
public interface SubscriptionMapper {
    @Mapping(target = "subscribedAt", expression = "java(subscription.getSubscribedAt() != null ? subscription.getSubscribedAt().toString() : null)")
    SubscriptionDto toDto(Subscription subscription);
    
    @Mapping(target = "subscribedAt", expression = "java(subscriptionDto.getSubscribedAt() != null ? Timestamp.from(Instant.parse(subscriptionDto.getSubscribedAt())) : null)")
    Subscription toEntity(SubscriptionDto subscriptionDto);
}
