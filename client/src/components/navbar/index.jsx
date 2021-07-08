import React, { useState, useEffect } from "react";
import "./navbar.css";
import Nav from "react-bootstrap/Nav";
import avatar1 from "../../images/auth/frog.svg";
import avatar2 from "../../images/auth/mario.svg";
import avatar3 from "../../images/auth/peach.svg";
import avatar4 from "../../images/auth/pacman.svg";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import toggle from "../../images/common/toggle.svg";
import logo from "../../images/home/logo.svg";
import { signOut } from "../../api";
import close from "../../images/common/close.svg";

function Navbar() {
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const avatarData = {
    1: avatar1,
    2: avatar2,
    3: avatar3,
    4: avatar4,
  };
  const handleClick = () => {
    setSidebar(!sidebar);
    if (sidebar) {
      document.getElementById("sidebar").style.display = "block";
    } else {
      document.getElementById("sidebar").style.display = "none";
    }
  };
  const history = useHistory();
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setSidebar(false);
    document.getElementById("sidebar").style.display = "none";
  }, [location]);
  return (
    <div>
      <svg
        width="100vw"
        viewBox="0 0 1920 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="d-block d-sm-nones"
      >
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1920"
          height="131"
        >
          <path
            d="M81.5227 70.2782L72.3865 80.1171H0V0H1920V80.1171H1848.32L1838.48 70.2782H1556.66L1510.28 130.717H411.83L364.744 70.2782H81.5227Z"
            fill="#000A0F"
          />
        </mask>
        <g mask="url(#mask0)">
          <path
            d="M81.5227 69.5754L70.981 80.1171H0V0H1920V80.1171H1849.02L1838.48 69.5754H1555.96L1508.87 129.312H411.83L364.744 69.5754H81.5227Z"
            fill="#000A0F"
          />
          <line
            y1="-0.715959"
            x2="15.9021"
            y2="-0.715959"
            transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 70.2788 80.1172)"
            stroke="#405C6B"
            stroke-width="1.43192"
          />
          <line
            x1="412.338"
            y1="130.337"
            x2="364.882"
            y2="69.3123"
            stroke="#405C6B"
            stroke-width="1.43192"
          />
          <g opacity="0.015">
            <line
              y1="6.85278"
              x2="1340.86"
              y2="6.85278"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="14.7056"
              x2="1340.86"
              y2="14.7056"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="22.5583"
              x2="1340.86"
              y2="22.5583"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="30.4111"
              x2="1340.86"
              y2="30.4111"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="38.2639"
              x2="1340.86"
              y2="38.2639"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="46.1165"
              x2="1340.86"
              y2="46.1165"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="53.9692"
              x2="1340.86"
              y2="53.9692"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="61.822"
              x2="1340.86"
              y2="61.822"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="69.6748"
              x2="1340.86"
              y2="69.6748"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="77.5276"
              x2="1340.86"
              y2="77.5276"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="85.3804"
              x2="1340.86"
              y2="85.3804"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="93.2332"
              x2="1340.86"
              y2="93.2332"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="101.086"
              x2="1340.86"
              y2="101.086"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="108.939"
              x2="1340.86"
              y2="108.939"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="116.792"
              x2="1340.86"
              y2="116.792"
              stroke="white"
              stroke-width="2"
            />
            <line
              y1="124.644"
              x2="1340.86"
              y2="124.644"
              stroke="white"
              stroke-width="2"
            />
          </g>
        </g>
        <line
          x1="1848.65"
          y1="79.5826"
          x2="1837.44"
          y2="68.3724"
          stroke="#405C6B"
        />
        <line
          y1="-0.5"
          x2="77.0687"
          y2="-0.5"
          transform="matrix(0.613872 -0.789406 -0.789406 -0.613872 1508.49 128.857)"
          stroke="#405C6B"
        />
        <line x1="82" y1="68.5" x2="121" y2="68.5" stroke="#405C6B" />
        <line x1="306" y1="68.5" x2="366" y2="68.5" stroke="#405C6B" />
        <line x1="412" y1="129.5" x2="560" y2="129.5" stroke="#405C6B" />
        <line
          x1="1365.56"
          y1="129.175"
          x2="1509.89"
          y2="129.175"
          stroke="#405C6B"
        />
        <line
          x1="1556.14"
          y1="68.9202"
          x2="1640.21"
          y2="68.9202"
          stroke="#405C6B"
        />
        <line
          x1="720.982"
          y1="129.175"
          x2="882.128"
          y2="129.175"
          stroke="#405C6B"
        />
        <line
          x1="1043.27"
          y1="129.175"
          x2="1204.42"
          y2="129.175"
          stroke="#405C6B"
        />
        <line
          x1="1801.36"
          y1="68.9202"
          x2="1837.79"
          y2="68.9202"
          stroke="#405C6B"
        />
        <Link to="/">
          <rect
            x="569.646"
            y="108.656"
            width="140.126"
            height="39.2354"
            fill={`${location.pathname === "/" ? "#3dbef5" : "#131C20"}`}
          />
        </Link>
        <line
          x1="720.081"
          y1="115.662"
          x2="720.081"
          y2="140.885"
          stroke="#405C6B"
        />
        <line
          x1="882.628"
          y1="115.662"
          x2="882.628"
          y2="140.885"
          stroke="#405C6B"
        />
        <line
          x1="1042.37"
          y1="115.662"
          x2="1042.37"
          y2="140.885"
          stroke="#405C6B"
        />
        <line
          x1="1204.92"
          y1="115.662"
          x2="1204.92"
          y2="140.885"
          stroke="#405C6B"
        />
        <line
          x1="1640.71"
          y1="56.8088"
          x2="1640.71"
          y2="82.0316"
          stroke="#405C6B"
        />
        <line
          x1="1364.66"
          y1="115.662"
          x2="1364.66"
          y2="140.885"
          stroke="#405C6B"
        />
        <line
          x1="1800.46"
          y1="56.8088"
          x2="1800.46"
          y2="82.0316"
          stroke="#405C6B"
        />
        <line
          x1="560.337"
          y1="115.662"
          x2="560.337"
          y2="140.885"
          stroke="#405C6B"
        />
        <mask
          id="mask1"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="891"
          y="108"
          width="142"
          height="40"
        >
          <rect
            x="891.937"
            y="108.656"
            width="140.126"
            height="39.2354"
            fill={`${location.pathname === "/events" ? "#3dbef5" : "#131C20"}`}
          />
        </mask>
        <g mask="url(#mask1)">
          <Link to="/events">
            <rect
              x="891.937"
              y="108.656"
              width="140.126"
              height="39.2354"
              fill={`${
                location.pathname === "/events" ? "#3dbef5" : "#131C20"
              }`}
            />
          </Link>
          <g opacity="0.015">
            <line
              x1="4.93652"
              y1="110.458"
              x2="1919.06"
              y2="110.458"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="4.93652"
              y1="121.668"
              x2="1919.06"
              y2="121.668"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="4.93652"
              y1="132.878"
              x2="1919.06"
              y2="132.878"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="4.93652"
              y1="144.088"
              x2="1919.06"
              y2="144.088"
              stroke="white"
              stroke-width="2"
            />
          </g>
        </g>
        <mask
          id="mask2"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="1214"
          y="108"
          width="141"
          height="40"
        >
          <rect
            x="1214.23"
            y="108.656"
            width="140.126"
            height="39.2354"
            fill="#131C20"
          />
        </mask>
        <g mask="url(#mask2)">
          <Link to="/editor">
            <rect
              x="1214.23"
              y="108.656"
              width="140.126"
              height="39.2354"
              fill={`${
                location.pathname === "/editor" ? "#3dbef5" : "#131C20"
              }`}
            />
          </Link>
          <g opacity="0.015">
            <line
              x1="327.228"
              y1="110.458"
              x2="2241.35"
              y2="110.458"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="327.228"
              y1="121.668"
              x2="2241.35"
              y2="121.668"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="327.228"
              y1="132.878"
              x2="2241.35"
              y2="132.878"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="327.228"
              y1="144.088"
              x2="2241.35"
              y2="144.088"
              stroke="white"
              stroke-width="2"
            />
          </g>
        </g>
        <mask
          id="mask3"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="1651"
          y="49"
          width="141"
          height="41"
        >
          <rect
            x="1651.42"
            y="49.8025"
            width="140.126"
            height="39.2354"
            fill="#131C20"
          />
        </mask>

        {token && user ? (
          <Link
            to="/profile"
            className=" sidebar-item px-3 d-flex font-25 mb-4 mt-3"
          >
            <image href={avatarData[user?.avatar]} width="40" height="40" x="1647" y="50"/>
          </Link>
        ) : (
          <Link to="/login">
            <g mask="url(#mask3)">
              <rect
                x="1651.42"
                y="49.8025"
                width="140.126"
                height="39.2354"
                fill={`${
                  location.pathname === "/login" ? "#3dbef5" : "#131C20"
                }`}
              />
              <g opacity="0.015">
                <line
                  x1="764.422"
                  y1="51.6052"
                  x2="2678.55"
                  y2="51.6052"
                  stroke="white"
                  stroke-width="2"
                />
                <line
                  x1="764.422"
                  y1="62.8152"
                  x2="2678.55"
                  y2="62.8152"
                  stroke="white"
                  stroke-width="2"
                />
                <line
                  x1="764.422"
                  y1="74.0254"
                  x2="2678.55"
                  y2="74.0254"
                  stroke="white"
                  stroke-width="2"
                />
                <line
                  x1="764.422"
                  y1="85.2354"
                  x2="2678.55"
                  y2="85.2354"
                  stroke="white"
                  stroke-width="2"
                />
              </g>
            </g>
          </Link>
        )}

        <Link to="/">
          <path
            d="M619.201 127.82V133.679H617.248V120.007H619.201V125.866H625.061V120.007H627.014V133.679H625.061V127.82H619.201ZM635.803 121.96H631.896V122.937H630.92V130.749H631.896V131.726H635.803V130.749H636.779V122.937H635.803V121.96ZM630.92 120.984V120.007H636.779V120.984H637.756V121.96H638.732V131.726H637.756V132.702H636.779V133.679H630.92V132.702H629.943V131.726H628.967V121.96H629.943V120.984H630.92ZM642.639 133.679H640.686V120.007H642.639V121.96H643.615V122.937H644.592V123.913H646.545V122.937H647.521V121.96H648.498V120.007H650.451V133.679H648.498V124.89H647.521V125.866H646.545V127.82H644.592V125.866H643.615V124.89H642.639V133.679ZM662.17 120.007V121.96H654.357V125.866H660.217V127.82H654.357V131.726H662.17V133.679H652.404V120.007H662.17Z"
            fill={`${location.pathname === "/" ? "#131C20" : "#3dbef5"}`}
          />
        </Link>
        <Link to="/events">
          <path
            d="M936.885 120.007V121.96H929.073V125.866H934.932V127.82H929.073V131.726H936.885V133.679H927.12V120.007H936.885ZM939.815 129.773H938.838V120.007H940.791V128.796H941.768V129.773H942.745V130.749H944.698V129.773H945.674V128.796H946.651V120.007H948.604V129.773H947.627V130.749H946.651V131.726H945.674V132.702H944.698V133.679H942.745V132.702H941.768V131.726H940.791V130.749H939.815V129.773ZM960.323 120.007V121.96H952.51V125.866H958.37V127.82H952.51V131.726H960.323V133.679H950.557V120.007H960.323ZM964.229 125.866V133.679H962.276V120.007H964.229V122.937H965.206V123.913H966.182V124.89H967.159V125.866H968.135V126.843H969.112V127.82H970.088V120.007H972.041V133.679H970.088V130.749H969.112V129.773H968.135V128.796H967.159V127.82H966.182V126.843H965.206V125.866H964.229ZM977.901 121.96H973.995V120.007H983.76V121.96H979.854V133.679H977.901V121.96ZM994.502 121.96H995.479V123.913H993.526V122.937H992.549V121.96H988.643V122.937H987.666V124.89H988.643V125.866H993.526V126.843H994.502V127.82H995.479V131.726H994.502V132.702H993.526V133.679H987.666V132.702H986.69V131.726H985.713V129.773H987.666V130.749H988.643V131.726H992.549V130.749H993.526V128.796H992.549V127.82H987.666V126.843H986.69V125.866H985.713V121.96H986.69V120.984H987.666V120.007H993.526V120.984H994.502V121.96Z"
            fill={`${location.pathname === "/events" ? "#131C20" : "#3dbef5"}`}
          />
        </Link>
        <Link to="/editor">
          {/* <text
            x="1230.23"
            y="115.656"
            fill={`${location.pathname === "/editor" ? "#131C20" : "#3dbef5"}`}
            class="font-vcr font-blue"
          >
            EDITOR
          </text> */}
          <path
            d="M1260.13 120.007V121.96H1252.32V125.866H1258.18V127.82H1252.32V131.726H1260.13V133.679H1250.36V120.007H1260.13ZM1264.03 121.96V131.726H1268.92V130.749H1269.89V122.937H1268.92V121.96H1264.03ZM1262.08 133.679V120.007H1269.89V120.984H1270.87V121.96H1271.85V131.726H1270.87V132.702H1269.89V133.679H1262.08ZM1275.75 133.679V131.726H1277.71V121.96H1275.75V120.007H1281.61V121.96H1279.66V131.726H1281.61V133.679H1275.75ZM1289.43 121.96H1285.52V120.007H1295.28V121.96H1291.38V133.679H1289.43V121.96ZM1304.07 121.96H1300.17V122.937H1299.19V130.749H1300.17V131.726H1304.07V130.749H1305.05V122.937H1304.07V121.96ZM1299.19 120.984V120.007H1305.05V120.984H1306.03V121.96H1307V131.726H1306.03V132.702H1305.05V133.679H1299.19V132.702H1298.21V131.726H1297.24V121.96H1298.21V120.984H1299.19ZM1310.91 121.96V125.866H1315.79V124.89H1316.77V122.937H1315.79V121.96H1310.91ZM1311.89 127.82H1310.91V133.679H1308.96V120.007H1316.77V120.984H1317.75V121.96H1318.72V125.866H1317.75V126.843H1316.77V127.82H1314.82V128.796H1315.79V129.773H1316.77V130.749H1317.75V131.726H1318.72V133.679H1316.77V132.702H1315.79V131.726H1314.82V130.749H1313.84V129.773H1312.86V128.796H1311.89V127.82Z"
            fill={`${location.pathname === "/editor" ? "#131C20" : "#3dbef5"}`}
          />
        </Link>
        {token && user ? (
          <text fill="#3dbef5" x="1695" y="78" fontSize="22px" className="font-vcr">{user.full_name.split(" ")[0]}</text>
        ) : (
          <Link to="/login">
            <path
              d="M1693.87 74.8259V61.1541H1695.82V72.8728H1703.63V74.8259H1693.87ZM1712.42 63.1072H1708.51V64.0837H1707.54V71.8962H1708.51V72.8728H1712.42V71.8962H1713.4V64.0837H1712.42V63.1072ZM1707.54 62.1306V61.1541H1713.4V62.1306H1714.37V63.1072H1715.35V72.8728H1714.37V73.8494H1713.4V74.8259H1707.54V73.8494H1706.56V72.8728H1705.58V63.1072H1706.56V62.1306H1707.54ZM1726.09 63.1072H1727.07V65.0603H1725.12V64.0837H1724.14V63.1072H1720.23V64.0837H1719.26V71.8962H1720.23V72.8728H1724.14V71.8962H1725.12V68.9666H1722.19V67.0134H1727.07V72.8728H1726.09V73.8494H1725.12V74.8259H1719.26V73.8494H1718.28V72.8728H1717.3V63.1072H1718.28V62.1306H1719.26V61.1541H1725.12V62.1306H1726.09V63.1072ZM1730.97 74.8259V72.8728H1732.93V63.1072H1730.97V61.1541H1736.83V63.1072H1734.88V72.8728H1736.83V74.8259H1730.97ZM1742.69 67.0134V74.8259H1740.74V61.1541H1742.69V64.0837H1743.67V65.0603H1744.65V66.0369H1745.62V67.0134H1746.6V67.99H1747.58V68.9666H1748.55V61.1541H1750.51V74.8259H1748.55V71.8962H1747.58V70.9197H1746.6V69.9431H1745.62V68.9666H1744.65V67.99H1743.67V67.0134H1742.69Z"
              fill={`${location.pathname === "/login" ? "#131C20" : "#3dbef5"}`}
            />
          </Link>
        )}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M177.098 49.7477H163.249V52.0581H160.926V70.4301H163.249V72.7184H177.098V70.4301H179.398V52.0581H177.098V49.7477ZM174.797 58.9448V68.1196H165.55V54.3457H174.797V58.9444V58.9448ZM198.728 52.0356H196.404V49.7252H182.556V72.6958H196.404V70.4076H198.728V68.0972H201.028V54.3236H198.728V52.0353V52.0356ZM196.404 58.9209V68.0958H187.18V54.3236H196.404V58.9219V58.9209ZM218.036 49.7249H204.186V72.6955H222.658V68.0968H208.81V63.5206H218.036V61.2102H220.359V58.9219H208.809V54.3236H222.658V49.7249H218.036ZM241.989 49.7474H225.816V72.718H230.44V65.8327H239.665V63.5223H241.988V61.2344H244.288V52.0578H241.988V49.7477L241.989 49.7474ZM235.066 61.234H230.44V54.3487H239.665V61.234H235.063H235.066ZM263.62 52.0591H261.319V49.7477H252.07V52.0581H249.769V54.346H247.446V72.718H252.07V65.8327H261.317V72.718H265.918V54.346H263.618V52.0581L263.62 52.0591ZM261.342 61.2115H252.092V56.633H254.393V54.3225H259.017V56.633H261.34V61.2092L261.342 61.2115Z"
          fill="#00425E"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M151.767 49.6594H128.026V53.6203H124.044V85.1146H128.026V89.0372H151.767V85.1146H155.711V77.2322H147.784V81.1544H131.97V57.5429H147.784V61.5031H155.711V53.6203H151.767V49.6594Z"
          fill="#00425E"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M298.761 53.6203H294.778V49.6594H271.038V89.0379H294.778V85.1146H298.761V81.1544H302.705V57.5429H298.761V53.6203ZM294.778 65.4261V81.1544H278.964V57.5429H294.778V65.4261Z"
          fill="#00425E"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M161.038 81.9534H265.786V88.8974H161.038V81.9534Z"
          fill="#00425E"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M177.098 47.0879H163.249V49.3984H160.926V67.7703H163.249V70.0586H177.098V67.7703H179.398V49.3984H177.098V47.0879ZM174.797 56.285V65.4599H165.55V51.6863H174.797V56.285ZM198.728 49.3759H196.404V47.0654H182.556V70.0361H196.404V67.7478H198.728V65.4374H201.028V51.6638H198.728V49.3759ZM196.404 56.2612V65.436H187.18V51.6638H196.404V56.2635V56.2612ZM218.036 47.0654H204.186V70.0361H222.658V65.4374H208.81V60.8612H218.036V58.5508H220.359V56.2635H208.809V51.6638H222.658V47.0654H218.036ZM241.989 47.0879H225.816V70.0586H230.44V63.1733H239.665V60.8629H241.988V58.5749H244.288V49.3984H241.988V47.0879H241.989ZM235.066 58.5746H230.44V51.6893H239.665V58.5746H235.063H235.066ZM263.62 49.3997H261.319V47.0893H252.07V49.3997H249.769V51.6876H247.446V70.0596H252.07V63.1743H261.317V70.0596H265.918V51.6876H263.618V49.3984L263.62 49.3997ZM261.342 58.5521H252.092V53.9746H254.393V51.6638H259.017V53.9746H261.34V58.5508L261.342 58.5521Z"
          fill="#3dbef5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M151.768 47.0002H128.027V50.9611H124.045V82.4561H128.027V86.3787H151.768V82.4561H155.712V74.573H147.785V78.4952H131.971V54.8837H147.785V58.8446H155.712V50.9611H151.768V47.0002Z"
          fill="#3dbef5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M298.761 50.9609H294.778V47H271.038V86.3785H294.778V82.4559H298.761V78.495H302.705V54.8835H298.761V50.9609ZM294.778 62.7666V78.495H278.964V54.8835H294.778V62.7666Z"
          fill="#3dbef5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M161.038 79.2937H265.786V86.2378H161.038V79.2937Z"
          fill="#3dbef5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M163.155 80.6971H257.263V82.2484H163.155V80.6971ZM259.213 80.6971H264.098V82.2484H259.213V80.6971ZM273.678 48.4517H292.117V50.8156H273.678V48.4517ZM130.474 48.4517H148.912V50.8156H130.474V48.4517ZM253.262 48.2301H259.854V49.8553H253.262V48.2301ZM227.33 48.2301H240.329V49.8553H227.33V48.2301H227.33ZM183.99 48.2301H195.168V49.8553H183.99V48.2301ZM164.586 47.9345H175.262V49.5598H164.585V47.9338L164.586 47.9345ZM205.725 48.2485H221.333V49.8369H205.725V48.2485H205.725Z"
          fill="#BAEAFF"
        />
        {token && (
          <svg
            width="3400.42"
            height="116"
            y="110"
            viewBox="0 0 208 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M161.532 12.539L172.596 0.737549L184.397 12.539H161.532Z"
              fill="#131C20"
            />
            <line
              x1="162.27"
              y1="12.539"
              x2="3.05821e-05"
              y2="12.539"
              stroke="#405C6B"
              stroke-width="1.47518"
            />
            <Link to="/profile">
              <rect
                y="11.8014"
                width="206.525"
                height="51.6312"
                fill={`${
                  location.pathname === "/profile" ? "#3dbef5" : "#131C20"
                }`}
              />
            </Link>
            <path
              opacity="0.6"
              d="M0 63.4326H208V102.525L201.362 108.426L194.723 115.064H0V63.4326Z"
              fill="#131C20"
            />
            <Link to="/profile">
              <path
                d="M38.0608 33.3772V35.3941H29.9934V39.4277H36.0439V41.4446H29.9934V45.4783H38.0608V47.4951H27.9765V33.3772H38.0608ZM42.0945 35.3941V45.4783H47.1366V44.4699H48.145V36.4025H47.1366V35.3941H42.0945ZM40.0776 47.4951V33.3772H48.145V34.3856H49.1534V35.3941H50.1618V45.4783H49.1534V46.4867H48.145V47.4951H40.0776ZM54.1955 47.4951V45.4783H56.2124V35.3941H54.1955V33.3772H60.246V35.3941H58.2292V45.4783H60.246V47.4951H54.1955ZM68.3134 35.3941H64.2797V33.3772H74.364V35.3941H70.3303V47.4951H68.3134V35.3941ZM90.4987 35.3941V39.4277H95.5408V38.4193H96.5492V36.4025H95.5408V35.3941H90.4987ZM90.4987 41.4446V47.4951H88.4819V33.3772H96.5492V34.3856H97.5577V35.3941H98.5661V39.4277H97.5577V40.4362H96.5492V41.4446H90.4987ZM102.6 35.3941V39.4277H107.642V38.4193H108.65V36.4025H107.642V35.3941H102.6ZM103.608 41.4446H102.6V47.4951H100.583V33.3772H108.65V34.3856H109.659V35.3941H110.667V39.4277H109.659V40.4362H108.65V41.4446H106.633V42.453H107.642V43.4614H108.65V44.4699H109.659V45.4783H110.667V47.4951H108.65V46.4867H107.642V45.4783H106.633V44.4699H105.625V43.4614H104.617V42.453H103.608V41.4446ZM119.743 35.3941H115.709V36.4025H114.701V44.4699H115.709V45.4783H119.743V44.4699H120.751V36.4025H119.743V35.3941ZM114.701 34.3856V33.3772H120.751V34.3856H121.76V35.3941H122.768V45.4783H121.76V46.4867H120.751V47.4951H114.701V46.4867H113.692V45.4783H112.684V35.3941H113.692V34.3856H114.701ZM134.869 33.3772V35.3941H126.802V39.4277H132.852V41.4446H126.802V47.4951H124.785V33.3772H134.869ZM138.903 47.4951V45.4783H140.92V35.3941H138.903V33.3772H144.953V35.3941H142.937V45.4783H144.953V47.4951H138.903ZM148.987 47.4951V33.3772H151.004V45.4783H159.071V47.4951H148.987ZM171.172 33.3772V35.3941H163.105V39.4277H169.156V41.4446H163.105V45.4783H171.172V47.4951H161.088V33.3772H171.172Z"
                fill={`${
                  location.pathname === "/profile" ? "#131C20" : "#3dbef5"
                }`}
              />
            </Link>
            <path
              opacity="0.3"
              d="M194.724 114.326L207.263 101.787V63.4326H0.737793V114.326H194.724Z"
              fill="#131C20"
              onClick={() => signOut(history)}
            />
            <path
              d="M28.1379 94.7007V80.5828H30.1547V92.6838H38.2221V94.7007H28.1379ZM47.2979 82.5996H43.2642V83.608H42.2558V91.6754H43.2642V92.6838H47.2979V91.6754H48.3063V83.608H47.2979V82.5996ZM42.2558 81.5912V80.5828H48.3063V81.5912H49.3147V82.5996H50.3232V92.6838H49.3147V93.6923H48.3063V94.7007H42.2558V93.6923H41.2474V92.6838H40.239V82.5996H41.2474V81.5912H42.2558ZM61.4158 82.5996H62.4242V84.6165H60.4074V83.608H59.399V82.5996H55.3653V83.608H54.3569V91.6754H55.3653V92.6838H59.399V91.6754H60.4074V88.6502H57.3821V86.6333H62.4242V92.6838H61.4158V93.6923H60.4074V94.7007H54.3569V93.6923H53.3484V92.6838H52.34V82.5996H53.3484V81.5912H54.3569V80.5828H60.4074V81.5912H61.4158V82.5996ZM71.5 82.5996H67.4663V83.608H66.4579V91.6754H67.4663V92.6838H71.5V91.6754H72.5085V83.608H71.5V82.5996ZM66.4579 81.5912V80.5828H72.5085V81.5912H73.5169V82.5996H74.5253V92.6838H73.5169V93.6923H72.5085V94.7007H66.4579V93.6923H65.4495V92.6838H64.4411V82.5996H65.4495V81.5912H66.4579ZM77.5506 92.6838H76.5421V80.5828H78.559V91.6754H79.5674V92.6838H83.6011V91.6754H84.6095V80.5828H86.6264V92.6838H85.6179V93.6923H84.6095V94.7007H78.559V93.6923H77.5506V92.6838ZM92.6769 82.5996H88.6432V80.5828H98.7274V82.5996H94.6937V94.7007H92.6769V82.5996Z"
              fill="#7A8589"
            />
            <line
              x1="173.117"
              y1="0.521554"
              x2="161.316"
              y2="12.323"
              stroke="#405C6B"
              stroke-width="1.47518"
            />
            <line
              x1="207.323"
              y1="102.053"
              x2="195.521"
              y2="113.855"
              stroke="#405C6B"
              stroke-width="1.47518"
            />
            <line
              y1="-0.737589"
              x2="16.6897"
              y2="-0.737589"
              transform="matrix(0.707107 0.707107 0.707107 -0.707107 172.596 0)"
              stroke="#405C6B"
              stroke-width="1.47518"
            />
            <line
              x1="196.199"
              y1="114.326"
              x2="0.000152641"
              y2="114.326"
              stroke="#405C6B"
              stroke-width="1.47518"
            />
            <line
              x1="206.525"
              y1="12.539"
              x2="182.922"
              y2="12.539"
              stroke="#405C6B"
              stroke-width="1.47518"
            />
            <line
              x1="0.737589"
              y1="11.8014"
              x2="0.737589"
              y2="115.064"
              stroke="#405C6B"
              stroke-width="1.47518"
            />
            <line
              x1="207.262"
              y1="11.8014"
              x2="207.262"
              y2="103.262"
              stroke="#405C6B"
              stroke-width="1.47518"
            />
            <line
              y1="11.7919"
              x2="162"
              y2="11.7919"
              stroke="#405C6B"
              stroke-width="1.48"
            />
          </svg>
        )}
      </svg>

      <nav className="navbar navbar-expand-xl d-none">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Code-pad"
            className="img-fluid px-0"
            width="120px"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={handleClick}
        >
          <span className="navbar-tog*gler-icon">
            <img src={toggle} alt="toggle" width="35px" height="35px" />
          </span>
        </button>
        <div className="sidebar" id="sidebar">
          <div className="sidebar-content">
            <div
              className="clearfix"
              onClick={handleClick}
              style={{ cursor: "pointer", textAlign: "right" }}
            >
              <img
                src={close}
                alt="close"
                width="30px"
                height="30px"
                className="m-4"
              />
            </div>
            {token && user && (
              <Link
                to="/profile"
                className=" sidebar-item px-3 d-flex font-25 mb-4 mt-3"
              >
                <img
                  src={avatarData[user?.avatar]}
                  alt="a"
                  className="img-fluid"
                />
                <span className="ml-2 font-vcr">{user.username}</span>
              </Link>
            )}

            <Link to="/">
              <div className="mt-2 font-vcr font-25 px-3 sidebar-item py-2 home">
                Home
              </div>
            </Link>
            <Link to="/events">
              <div className="mt-2 font-vcr font-25 px-3 sidebar-item py-2">
                Events
              </div>
            </Link>
            {token ? (
              <>
                <Link to="/profile">
                  <div className="mt-2 font-vcr font-25 px-3 sidebar-item py-2">
                    Profile
                  </div>
                </Link>
                <div onClick={() => signOut(history)}>
                  <div className="mt-2 font-vcr font-25 px-3 sidebar-item py-2">
                    Logout
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <div className="mt-2 font-vcr font-25 px-3 sidebar-item py-2">
                    Signup
                  </div>
                </Link>
                <Link to="/login">
                  <div className="mt-2 font-vcr font-25 px-3 sidebar-item py-2">
                    Login
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <Nav className="navbar-nav mx-auto mt-5">
            <NavLink
              exact
              to="/"
              activeClassName="active-nav-item"
              className="mr-5"
            >
              <NavLink
                className="text-center p-3 font-16 font-vcr font-blue line nav-item home"
                exact
                to="/"
              >
                HOME
              </NavLink>
            </NavLink>
            <NavLink
              to="/events"
              activeClassName="active-nav-item"
              className="mx-5"
            >
              <NavLink
                className="text-center p-3 nav-item font-blue font-16 font-vcr line"
                exact
                to="/events"
              >
                EVENTS
              </NavLink>
            </NavLink>
            {token ? (
              <NavLink
                to="/profile"
                activeClassName="active-nav-item"
                className="mx-5"
              >
                <NavLink
                  className="text-center p-3 nav-item font-blue font-16 font-vcr line"
                  exact
                  to="/profile"
                >
                  PROFILE
                </NavLink>
              </NavLink>
            ) : (
              <NavLink
                to="/signup"
                activeClassName="active-nav-item"
                className="mx-5"
              >
                <NavLink
                  className="text-center p-3 nav-item font-blue font-16 font-vcr line"
                  exact
                  to="/signup"
                >
                  SIGNUP
                </NavLink>
              </NavLink>
            )}

            <NavLink
              to="/editor"
              activeClassName="active-nav-item"
              className="ml-5"
            >
              <NavLink
                className="text-center p-3 nav-item font-blue font-16 font-vcr editor"
                exact
                to="/editor"
              >
                EDITOR
              </NavLink>
            </NavLink>
          </Nav>
          {!token ? (
            <NavLink
              to="/login"
              activeClassName="active-nav-item"
              className="mx-3"
            >
              <NavLink
                className="text-center p-3 nav-item font-blue font-16 font-vcr mt-n2 login"
                exact
                to="/login"
              >
                LOGIN
              </NavLink>
            </NavLink>
          ) : (
            <div className="mx-3" style={{ cursor: "pointer" }}>
              <span
                className="text-center p-3 nav-item font-blue font-16 font-vcr mt-n2 login"
                onClick={() => signOut(history)}
              >
                LOGOUT
              </span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
