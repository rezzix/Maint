package com.maint.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "maint.jwt")
@Getter @Setter
public class JwtProperties {
    private String secret;
    private long accessTokenTtl;
    private long refreshTokenTtl;
}
