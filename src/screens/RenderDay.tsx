import removeStartingDoubleSlash from '@/helpers/removeStartingDoubleSlash';
import {ForecastDay} from '@/types/WeatherData';
import {Image, Text, View} from 'react-native';

type RenderImageProp = {
  item: ForecastDay;
};

const RenderImage: React.FC<RenderImageProp> = ({item}) => {
  console.log('Image: ', item?.condition?.text);
  let date = new Date(item.time);
  let options: Intl.DateTimeFormatOptions = {weekday: 'long'};
  let dayName = date.toLocaleDateString('en-US', options);
  let [dateString, timeString] = item?.time?.split(' ');

  let providedDateTime = new Date(item.time);
  let currentDateTime = new Date();
  console.log("providedDateTime", providedDateTime)
  console.log("currentDateTime", currentDateTime)
  // if (providedDateTime < currentDateTime) {
  //   return null;
  // }

  //if (index == 0) return null;
  return (
    <View
      key={'' + item?.time_epoch}
      className=" w-32 rounded-3xl py-4 px-5 ml-3 bg-slate-400">
      <Text className="text-slate-300 font-semibold text-center py-1">
        {dayName+ ' '+ timeString}
      </Text>
      <Image
        source={{
          uri:
            'https://' +
            removeStartingDoubleSlash(item?.condition?.icon || ''),
        }}
        className="w-20 h-20 self-center"
      />
      <Text className="text-slate-300 font-semibold text-center py-1">
        {item?.condition?.text
          ? '(' + item?.condition?.text + ')'
          : ''}
      </Text>
      <Text className="text-white font-semibold text-lg text-center">
        {item?.avgtemp_c}&#176;
      </Text>
    </View>
  );
};

export default RenderImage;
