package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.SubscriptionDto;
import com.golab18.vidime.dto.SubscriptionPartiesDto;
import com.golab18.vidime.entity.Subscription;
import java.sql.Timestamp;
import java.time.Instant;

@Mapper(componentModel = "spring", imports = {Timestamp.class, Instant.class})
public interface SubscriptionMapper {
    @Mapping(target = "subscriberId", source = "subscriber.id")
    @Mapping(target = "channelId", source = "channel.id")
    @Mapping(target = "subscribedAt", expression = "java(subscription.getSubscribedAt() != null ? subscription.getSubscribedAt().toString() : null)")
    SubscriptionDto toDto(Subscription subscription);
    
    @Mapping(target = "subscriber", expression = "java(subscriptionDto.getSubscriberId() != null ? new Channel(subscriptionDto.getSubscriberId()) : null)")
    @Mapping(target = "channel", expression = "java(subscriptionDto.getChannelId() != null ? new Channel(subscriptionDto.getChannelId()) : null)")
    @Mapping(target = "subscribedAt", expression = "java(subscriptionDto.getSubscribedAt() != null ? Timestamp.from(Instant.parse(subscriptionDto.getSubscribedAt())) : null)")
    Subscription toEntity(SubscriptionDto subscriptionDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "subscriber", expression = "java(subscriptionPartiesDto.getSubscriberId() != null ? new Channel(subscriptionPartiesDto.getSubscriberId()) : null)")
    @Mapping(target = "channel", expression = "java(subscriptionPartiesDto.getChannelId() != null ? new Channel(subscriptionPartiesDto.getChannelId()) : null)")
    @Mapping(target = "subscribedAt", ignore = true)
    Subscription partiesToEntity(SubscriptionPartiesDto subscriptionPartiesDto);
}
