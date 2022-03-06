

var CryptoData = {
    "async":true,
    "scroosDomain":true,
    "url":"https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false",
    "method":"GET",
    "headers": {}
}

$.ajax(CryptoData).done(function(res){
    var element = document.getElementById("content");
    for(let i=0;i<100;i++){
        var Coin  = document.createElement("div");
        Coin.className = "coin";
        
        var upperCoin = document.createElement("div");
        upperCoin.className = "upper";
        var img = document.createElement("img");
        img.src = res[i].image;
        upperCoin.appendChild(img);
        Coin.appendChild(upperCoin);

        var lowerCoin = document.createElement("div");
        lowerCoin.className = "lower";
        var Heading = document.createElement("h1");
        var headingContent = document.createTextNode(res[i].name);
        Heading.appendChild(headingContent);
        lowerCoin.appendChild(Heading);
        
        var coinPrice = document.createElement("h3");
        var coinPriceContent =  document.createTextNode("Price : ₹ "+res[i].current_price);
        coinPrice.appendChild(coinPriceContent);
        lowerCoin.appendChild(coinPrice);

        var priceChange = document.createElement("h3");
        var priceChangeContent = document.createTextNode("Price Change Percentage(24h) : "+ res[i].market_cap_change_percentage_24h);
        priceChange.appendChild(priceChangeContent);
        lowerCoin.appendChild(priceChange);

        var mktCap = document.createElement("h3");
        var mktCapContent = document.createTextNode("Market Cap : "+ res[i].market_cap);
        mktCap.appendChild(mktCapContent);
        lowerCoin.appendChild(mktCap);

        var volume = document.createElement("h3");
        var volumeContent = document.createTextNode("volume : "+ res[i].total_volume);
        volume.appendChild(volumeContent);
        lowerCoin.appendChild(volume);

        Coin.appendChild(lowerCoin);
        element.appendChild(Coin);
        console.log(res[i])
    };
})

