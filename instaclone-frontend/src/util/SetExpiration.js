const SetExpiration = (ttl) => {
    return new Date().getTime() + ttl
}

export default SetExpiration;