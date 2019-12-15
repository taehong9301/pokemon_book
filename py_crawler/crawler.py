# -*- coding: utf-8 -*-

import os
import re
import sys
import warnings

import bs4
import requests

warnings.filterwarnings(action='ignore')


class PokemonCrawler:
    def __init__(self, url, json_file_path, key):
        print("START:", url)
        self.key = key
        self.url = url

        self.json_file_path = json_file_path

        self.relative_img_path = "../assets/pokemon"
        self.img_path = os.path.join(os.getcwd(), self.relative_img_path)
        assert os.path.exists(self.img_path), "경로없음. 저장경로: {}".format(self.img_path)

        self.dex = 0
        self.name = ""
        self.img_name = ""
        self.desc = None
        self.types = None
        self.gender = None
        self.etc_info = None

    def get_pokemon_dex_n_name(self, context):
        """포켓몬 도감번호를 가져온다."""
        h1 = context.h1
        if h1 is None:
            return -1, "없음"

        infos = h1.get_text()

        if re.match(".+No\.\s[0-9]+", infos):
            name, dex_num = [_.strip() for _ in infos.split("No.") if _.strip()]
            return int(dex_num), name
        else:
            raise RuntimeError("이름과 도감번호를 가지고 오지 못함. infos: %s" % infos)

    def save_image_file(self, save_path, remote_img_path):
        """이미지를 저장한다.

        ../asset/pokemon/* 에 저장하기를 추천함."""
        if os.path.exists(save_path):
            return

        with open(save_path, "wb") as f:
            img_src = remote_img_path
            img_rs = requests.get(img_src)
            if img_rs.status_code == 200:
                f.write(bytes(img_rs.content))
            else:
                raise RuntimeError("이미지를 가져오지 못함. {}".format(img_rs.status_code))

    def get_desc(self, sub_divs):
        """버전별로 설명을 가져온다.

        descriptionX: X버전
        descriptionY: Y버전
        """
        result = dict()
        for sub_div in sub_divs:
            if sub_div["class"] == ["descriptionX"]:
                result["x"] = sub_div.text.replace("\r", " ")
            elif sub_div["class"] == ["descriptionY"]:
                result["y"] = sub_div.text.replace("\r", " ")
        assert result, "설명을 가져오지 못함."
        return result

    def get_type(self, sub_divs):
        """타입을 가져온다."""
        result = set()
        for sub_div in sub_divs:
            if sub_div["class"] == ["type"]:
                result.update([_.text.strip() for _ in sub_div.find_all("span") if _.text.strip()])
        assert result, "타입을 가져오지 못함."
        return sorted(list(result))

    def get_gender(self, sub_divs):
        """성별을 가져온다."""
        result = dict()
        for sub_div in sub_divs:
            if sub_div["class"] == ["gender"]:
                raw_str = sub_div.span.text.strip()
                if raw_str.find("♂") > -1:
                    result["male"] = True
                if raw_str.find("♀") > -1:
                    result["female"] = True
                if raw_str.find("불명") > -1:
                    result["male"] = False
                    result["female"] = False

        assert result, "성별을 가져오지 못함."

        result["male"] = False if result.get("male", None) is None else result["male"]
        result["female"] = False if result.get("female", None) is None else result["female"]

        return result

    def get_etc_info(self, sub_bs):
        """성별을 가져온다."""
        result = {
            "height": .0,
            "weight": .0,
            "class": None,
            "specificity": "",
        }
        for sub_b in sub_bs:
            raw_str = sub_b.text

            if re.match(r"^[0-9]+\.[0-9]+m$", raw_str):
                result["height"] = raw_str.replace("m", "")

            elif re.match(r"^[0-9]+\.[0-9]+kg$", raw_str):
                result["weight"] = raw_str.replace("kg", "")

            elif re.match(r"^.+포켓몬$", raw_str):
                result["class"] = raw_str

            elif raw_str:
                result["specificity"] += raw_str
        result["specificity"] = result["specificity"].replace(" ", "").split("/")
        return result

    def save_json(self):
        result = {
            "key": self.key,
            "id": self.dex,
            "ko_name": self.name,
            "type": self.types,
            "desc": self.desc,
            "gender": self.gender,
            "height": self.etc_info["height"],
            "weight": self.etc_info["weight"],
            "class": self.etc_info["class"],
            "specificity": self.etc_info["specificity"],
            "image_path": os.path.join(self.relative_img_path, self.img_name).replace("\\", "/")
        }
        for k, v in result.items():
            assert v, "모든 정보를 가져오지 못했습니다. {}: {}".format(k, v)

        json_result = str(result)\
            .replace("'", "\"")\
            .replace("True", "true")\
            .replace("False", "false")\
            .replace(": \"{}\"".format(self.etc_info["height"]), ": {}".format(self.etc_info["height"]))\
            .replace(": \"{}\"".format(self.etc_info["weight"]), ": {}".format(self.etc_info["weight"]))

        with open(self.json_file_path, "a", encoding="utf-8") as f:
            f.write(json_result + ",")

    def run(self):
        rs = requests.get(self.url, verify=False)

        if rs.status_code != 200:
            print("실패! 읽어오지 못함.")
            sys.exit()

        context = bs4.BeautifulSoup(rs.text, "html.parser")

        # 이름과 도감번호를 가져온다.
        self.dex, self.name = self.get_pokemon_dex_n_name(context)
        if self.dex == -1:
            return

        divs = context.find_all("div")
        for div in divs:
            div_class_name = div["class"]
            if div_class_name == ["single_wrap"]:
                # 이미지를 가져온다.
                self.img_name = "{}.png".format(self.key)
                self.save_image_file(os.path.join(self.img_path, self.img_name), div.img["src"])

                # 설명을 가져온다.
                sub_divs = div.find_all("div")
                self.desc = self.get_desc(sub_divs)

                # 타입을 가져온다.
                self.types = self.get_type(sub_divs)

                # 성별을 가져온다.
                self.gender = self.get_gender(sub_divs)

                sub_bs = div.find_all("b")
                self.etc_info = self.get_etc_info(sub_bs)
                break

        self.save_json()


if __name__ == "__main__":
    # JSON 파일 생성
    json_path = os.path.join(os.getcwd(), "../assets/json")

    json_file_path = ""
    for i in range(200, 966):
        if i % 50 == 0:
            json_file_path = os.path.join(json_path, "dex_info{}.json".format((i // 50) + 1))

            with open(json_file_path, "w", encoding="utf-8") as f:
                f.write("{\"pokemon\": [")
            assert os.path.exists(json_file_path), "초기 JSON 파일을 생성하지 못했습니다. {}".format(json_file_path)

        url = r"https://pokemonkorea.co.kr/pokedex/single/{}".format(i+1)
        obj = PokemonCrawler(url, json_file_path, i+1)
        obj.run()

        if i % 50 == 49:
            with open(json_file_path, "r", encoding="utf-8") as fr:
                text = fr.read()[:-1] + "]}"
                with open(json_file_path, "w", encoding="utf-8") as f:
                    f.write(text)

    with open(json_file_path, "a", encoding="utf-8") as f:
        f.write("]}")
